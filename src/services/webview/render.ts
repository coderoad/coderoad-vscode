import * as path from 'path'
import * as vscode from 'vscode'
import { asyncReadFile } from '../node'
import { onError } from '../telemetry'
import { CONTENT_SECURITY_POLICY_EXEMPTIONS } from '../../environment'

const getNonce = (): string => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

/**
 * render
 * configures the index.html into a webview panel
 *
 * React + webpack generate a number of files that are injected on build time
 * and must be accommodated for the webview using a vscode:// path.
 *
 * Modified paths include
 * - /static/js/x.chunk.js
 * - /static/js/main.chunk.js
 * - runtime-main.js
 * - /static/css/x.chunk.css
 * - /static/css/main.chunk.css
 *
 * This function also:
 * - modifies the base href of the index.html to be the root of the workspace
 * - manages the CSP policy for all the loaded files
 */
async function render(panel: vscode.WebviewPanel, rootPath: string): Promise<void> {
  // generate vscode-resource build path uri
  const createUri = (_filePath: string): any => {
    const filePath = (_filePath.startsWith('vscode') ? _filePath.substr(16) : _filePath).replace('///', '\\')

    // @ts-ignore
    return panel.webview.asWebviewUri(vscode.Uri.file(path.join(rootPath, filePath)))
  }

  try {
    // load copied index.html from web app build
    let html = await asyncReadFile(path.join(rootPath, 'index.html'), 'utf8')

    // set base href at top of <head>
    const baseHref = `${vscode.Uri.file(path.join(rootPath, 'build')).with({ scheme: 'vscode-resource' })}`
    html = html.replace('<head>', `<head><base href="${baseHref}" />`)

    // used for CSP
    const nonces: string[] = []
    const hashes: string[] = []

    // fix paths for react static scripts to use vscode-resource paths
    var jsBundleChunkRegex = /\/static\/js\/[\d].[^"]*\.js/g
    var jsBundleChunk: RegExpExecArray | null = jsBundleChunkRegex.exec(html)
    if (jsBundleChunk) {
      const nonce: string = getNonce()
      nonces.push(nonce)
      const src = createUri(jsBundleChunk[0])
      // replace script src, add nonce
      html = html.replace(jsBundleChunk[0], `${src}" nonce="${nonce}`)
    }

    var mainBundleChunkRegex = /\/static\/js\/main.[^"]*\.js/g
    var mainBundleChunk: RegExpExecArray | null = mainBundleChunkRegex.exec(html)
    if (mainBundleChunk) {
      const nonce: string = getNonce()
      nonces.push(nonce)
      const src = createUri(mainBundleChunk[0])
      // replace script src, add nonce
      html = html.replace(mainBundleChunk[0], `${src}" nonce="${nonce}`)
    }

    // support additional CSP exemptions when CodeRoad is embedded
    if (CONTENT_SECURITY_POLICY_EXEMPTIONS && CONTENT_SECURITY_POLICY_EXEMPTIONS.length) {
      for (const exemption of CONTENT_SECURITY_POLICY_EXEMPTIONS.split(' ')) {
        // sha hashes should not be prefixed with 'nonce-'
        if (exemption.match(/^sha/)) {
          hashes.push(exemption)
        } else {
          nonces.push(exemption)
        }
      }
    }

    // note: file cannot be imported or results in esbuild error. Easier to read it.
    let manifest
    try {
      const manifestPath = path.join(rootPath, 'asset-manifest.json')
      const manifestFile = await asyncReadFile(manifestPath, 'utf8')
      manifest = JSON.parse(manifestFile)
    } catch (e) {
      throw new Error('Failed to read manifest file')
    }

    // add run-time script from webpack at top of <body>
    const runtimeNonce = getNonce()
    nonces.push(runtimeNonce)
    const runtimeSrc = createUri(manifest.files['runtime-main.js'])
    html = html.replace('<body>', `<body><script src="${runtimeSrc}" nonce="${runtimeNonce}"></script>`)

    var cssBundleChunkRegex = /\/static\/css\/[\d].[^"]*\.css/g
    var cssBundleChunk: RegExpExecArray | null = cssBundleChunkRegex.exec(html)
    if (cssBundleChunk) {
      const href = createUri(cssBundleChunk[0])
      // replace script src, add nonce
      html = html.replace(cssBundleChunk[0], href)
    }

    var mainCssBundleChunkRegex = /\/static\/css\/main.[^"]*\.css/g
    var mainCssBundleChunk: RegExpExecArray | null = mainCssBundleChunkRegex.exec(html)
    if (mainCssBundleChunk) {
      const href = createUri(mainCssBundleChunk[0])
      // replace script src, add nonce
      html = html.replace(mainCssBundleChunk[0], href)
    }

    // set CSP (content security policy) to grant permission to local files
    // while blocking unexpected malicious network requests
    const wrapInQuotes = (str: string) => `'${str}'`
    const nonceString = nonces.map((nonce: string) => wrapInQuotes(`nonce-${nonce}`)).join(' ')
    const hashString = hashes.map(wrapInQuotes).join(' ')

    const cspMetaString =
      [
        `default-src 'self'`,
        `manifest-src ${hashString} 'self'`,
        `connect-src https: http:`,
        // @ts-ignore
        `font-src ${panel.webview.cspSource} http: https: data:`,
        // @ts-ignore
        `img-src ${panel.webview.cspSource} https:`,
        `script-src ${nonceString} ${hashString} data:`,
        // @ts-ignore
        `style-src ${panel.webview.cspSource} https: 'self' 'unsafe-inline'`,
      ].join('; ') + ';'
    // add CSP to end of <head>
    html = html.replace('</head>', `<meta http-equiv="Content-Security-Policy" content="${cspMetaString}" /></head>`)

    // set view
    panel.webview.html = html
  } catch (error: any) {
    onError(error)
    console.error(error)
  }
}

export default render
