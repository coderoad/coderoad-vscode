import * as vscode from 'vscode'
import * as CR from 'typings'
import * as path from 'path'

import getNonce from './utils/nonce'
import onReceive from './onReceive'

const webpackScript = `!(function (l) {
    function e(e) {
        for (var r, t, n = e[0], o = e[1], u = e[2], f = 0, i = []; f < n.length; f++)
            (t = n[f]), p[t] && i.push(p[t][0]), (p[t] = 0)
        for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (l[r] = o[r])
        for (s && s(e); i.length;) i.shift()()
        return c.push.apply(c, u || []), a()
    }
    function a() {
        for (var e, r = 0; r < c.length; r++) {
            for (var t = c[r], n = !0, o = 1; o < t.length; o++) {
                var u = t[o]
                0 !== p[u] && (n = !1)
            }
            n && (c.splice(r--, 1), (e = f((f.s = t[0]))))
        }
        return e
    }
    var t = {},
        p = { 1: 0 },
        c = []
    function f(e) {
        if (t[e]) return t[e].exports
        var r = (t[e] = { i: e, l: !1, exports: {} })
        return l[e].call(r.exports, r, r.exports, f), (r.l = !0), r.exports
    }
    ; (f.m = l),
        (f.c = t),
        (f.d = function (e, r, t) {
            f.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: t })
        }),
        (f.r = function (e) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                Object.defineProperty(e, '__esModule', { value: !0 })
        }),
        (f.t = function (r, e) {
            if ((1 & e && (r = f(r)), 8 & e)) return r
            if (4 & e && 'object' == typeof r && r && r.__esModule) return r
            var t = Object.create(null)
            if (
                (f.r(t), Object.defineProperty(t, 'default', { enumerable: !0, value: r }), 2 & e && 'string' != typeof r)
            )
                for (var n in r)
                    f.d(
                        t,
                        n,
                        function (e) {
                            return r[e]
                        }.bind(null, n),
                    )
            return t
        }),
        (f.n = function (e) {
            var r =
                e && e.__esModule
                    ? function () {
                        return e.default
                    }
                    : function () {
                        return e
                    }
            return f.d(r, 'a', r), r
        }),
        (f.o = function (e, r) {
            return Object.prototype.hasOwnProperty.call(e, r)
        }),
        (f.p = './')
        console.log('load window.wepbackJsonp')
    var r = (window.webpackJsonp = window.webpackJsonp || []),
        n = r.push.bind(r)
        ; (r.push = e), (r = r.slice())
    for (var o = 0; o < r.length; o++) e(r[o])
    var s = n
    a()
})([])`

/**
 * Manages React webview panels
 */
class ReactPanel {
    /**
     * Track the currently panel. Only allow a single panel to exist at a time.
     */
    public static currentPanel: ReactPanel | undefined = undefined

    private readonly _panel: vscode.WebviewPanel
    private readonly _extensionPath: string
    private _disposables: vscode.Disposable[] = []

    public static async createOrShow(extensionPath: string): Promise<void> {
        // const hasActiveEditor = vscode.window.activeTextEditor

        // if (!hasActiveEditor) {
        //     throw new Error('Should have an open file on launch')
        // }
        const column = vscode.ViewColumn.One

        // If we already have a panel, show it.
        // Otherwise, create a new panel.
        if (ReactPanel.currentPanel) {
            console.log('--- HAS CURRENT PANEL ---')
            ReactPanel.currentPanel._panel.reveal(column)
        } else {
            ReactPanel.currentPanel = new ReactPanel(extensionPath, column)
        }
    }

    private constructor(extensionPath: string, column: vscode.ViewColumn) {
        this._extensionPath = extensionPath

        const viewType = 'CodeRoad'
        const title = 'CodeRoad'
        const config = {
            // Enable javascript in the webview
            enableScripts: true,

            // And restric the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [vscode.Uri.file(path.join(this._extensionPath, 'build'))],

            // prevents destroying the window when it is in the background
            retainContextWhenHidden: true,
        }

        // Create and show a new webview panel
        this._panel = vscode.window.createWebviewPanel(viewType, title, column, config)

        // Set the webview's initial html content
        this._panel.webview.html = this._getHtmlForWebview()

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables)

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(onReceive, null, this._disposables)
    }

    public async postMessage(action: CR.Action): Promise<void> {
        // Send a message to the webview webview.
        // You can send any JSON serializable data.
        const success = await this._panel.webview.postMessage(action)
        if (!success) {
            throw new Error(`Message post failure: ${JSON.stringify(action)}`)
        }
    }

    public dispose(): void {
        ReactPanel.currentPanel = undefined

        // Clean up our resources
        this._panel.dispose()

        while (this._disposables.length) {
            const x = this._disposables.pop()
            if (x) {
                x.dispose()
            }
        }
    }

    private _getHtmlForWebview(): string {

        // eslint-disable-next-line
        const manifest = require(path.join(this._extensionPath, 'build', 'asset-manifest.json'))
        const mainScript = manifest.files['main.js']
        // grab first chunk
        const chunk = Object.keys(manifest.files).filter(f => f.match(/^static\/js\/.+\.js$/))[0]
        const chunkScript = manifest.files[chunk]
        const mainStyle = manifest.files['main.css']

        const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainScript))
        const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' })
        const chunkPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', chunkScript))
        const chunkUri = chunkPathOnDisk.with({ scheme: 'vscode-resource' })
        const stylePathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainStyle))
        const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' })

        // Use a nonce to whitelist which scripts can be run
        const nonce = getNonce()
        const nonce2 = getNonce()
        const nonce3 = getNonce()

        const output = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
                <meta name="theme-color" content="#000000">
                <title>React App</title>
                <link rel="manifest" href="./manifest.json" />
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}' 'nonce-${nonce2}' 'nonce-${nonce3}'; style-src vscode-resource: 'unsafe-inline' http: https: data:;">
                <base href="${vscode.Uri.file(path.join(this._extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">
                <style></style>
			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root">Loading...</div>
                <script nonce=${nonce}>${webpackScript}</script>
                <script nonce=${nonce2} src="${chunkUri}"></script>
                <script nonce="${nonce3}" src="${scriptUri}"></script>
			</body>
            </html>`
        console.log(output)
        return output
    }
}

export default ReactPanel
