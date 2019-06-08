"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
const views_1 = require("./views");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    console.log('ACTIVATE!');
    // commands
    commands_1.default(context);
    // tasks
    // add tasks here
    // views
    views_1.default(context);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate(context) {
    // cleanup subscriptions/tasks
    console.log('deactivate context', context);
    for (const disposable of context.subscriptions) {
        disposable.dispose();
    }
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map