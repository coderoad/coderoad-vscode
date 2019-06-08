import * as vscode from 'vscode'

function onSaveHook(languageIds: string[]) {
    // trigger command on save
    vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        if (languageIds.includes(document.languageId) && document.uri.scheme === 'file') {
            // do work
            vscode.commands.executeCommand('coderoad.test_run')
        }
    })
}

export default onSaveHook