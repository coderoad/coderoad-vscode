import { JSDOM } from 'jsdom'
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

async function render(panel: vscode.WebviewPanel, rootPath: string): Promise<void> {
  try {
    // load copied index.html from web app build
    const dom = await JSDOM.fromFile(path.join(rootPath, 'index.html'))
    const { document } = dom.window

    // set base href
    const base: HTMLBaseElement = document.createElement('base')
    base.href = `${vscode.Uri.file(path.join(rootPath, 'build')).with({ scheme: 'vscode-resource' })}`

    document.head.appendChild(base)

    // used for CSP
    const nonces: string[] = []
    const hashes: string[] = []

    // generate vscode-resource build path uri
    const createUri = (_filePath: string): any => {
      const filePath = (_filePath.startsWith('vscode') ? _filePath.substr(16) : _filePath).replace('///', '\\')

      // @ts-ignore
      return panel.webview.asWebviewUri(vscode.Uri.file(path.join(rootPath, filePath)))
    }

    // fix paths for scripts
    const scripts: HTMLScriptElement[] = Array.from(document.getElementsByTagName('script'))
    for (const script of scripts) {
      if (script.src) {
        const nonce: string = getNonce()
        nonces.push(nonce)
        script.nonce = nonce
        script.src = createUri(script.src)
      }
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

    // add run-time script from webpack
    const runTimeScript = document.createElement('script')
    runTimeScript.nonce = getNonce()
    nonces.push(runTimeScript.nonce)

    // note: file cannot be imported or results in esbuild error. Easier to read it.
    let manifest
    try {
      const manifestPath = path.join(rootPath, 'asset-manifest.json')
      console.log(manifestPath)
      const manifestFile = await asyncReadFile(manifestPath, 'utf8')
      manifest = JSON.parse(manifestFile)
    } catch (e) {
      throw new Error('Failed to read manifest file')
    }

    runTimeScript.src = createUri(manifest.files['runtime-main.js'])
    document.body.appendChild(runTimeScript)

    // fix paths for links
    const styles: HTMLLinkElement[] = Array.from(document.getElementsByTagName('link'))
    for (const style of styles) {
      if (style.href) {
        style.href = createUri(style.href)
      }
    }

    // set CSP (content security policy) to grant permission to local files
    // while blocking unexpected malicious network requests
    const cspMeta: HTMLMetaElement = document.createElement('meta')
    cspMeta.httpEquiv = 'Content-Security-Policy'

    const wrapInQuotes = (str: string) => `'${str}'`
    const nonceString = nonces.map((nonce: string) => wrapInQuotes(`nonce-${nonce}`)).join(' ')
    const hashString = hashes.map(wrapInQuotes).join(' ')

    cspMeta.content =
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
    document.head.appendChild(cspMeta)

    // stringify dom
    const html = dom.serialize()

    // set view
    panel.webview.html = html
  } catch (error: any) {
    onError(error)
    console.error(error)
  }
}

export default render
