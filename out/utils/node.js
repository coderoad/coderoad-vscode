"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const fs = require("fs");
const vscode = require("vscode");
const path_1 = require("path");
const child_process_1 = require("child_process");
const util_1 = require("util");
const asyncExec = util_1.promisify(child_process_1.exec);
let workspaceRoot;
// set workspace root
// other function will use this to target the correct cwd
function setWorkspaceRoot() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rootPath } = vscode_1.workspace;
        if (!rootPath) {
            throw new Error('Requires a workspace. Please open a folder');
        }
        workspaceRoot = rootPath;
    });
}
exports.setWorkspaceRoot = setWorkspaceRoot;
exports.exec = (cmd) => asyncExec(cmd, {
    cwd: workspaceRoot,
});
// note: fs.exists is deprecated
// collect all paths together
exports.exists = (...paths) => fs.existsSync(path_1.join(workspaceRoot, ...paths));
exports.openFile = (relativeFilePath) => __awaiter(this, void 0, void 0, function* () {
    try {
        const absoluteFilePath = path_1.join(workspaceRoot, relativeFilePath);
        const doc = yield vscode.workspace.openTextDocument(absoluteFilePath);
        yield vscode.window.showTextDocument(doc, vscode.ViewColumn.One);
    }
    catch (error) {
        console.log(`Failed to open file ${relativeFilePath}`, error);
    }
});
//# sourceMappingURL=node.js.map