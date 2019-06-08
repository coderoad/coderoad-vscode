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
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const node_1 = require("./node");
function isEmptyWorkspace() {
    return __awaiter(this, void 0, void 0, function* () {
        const { stdout, stderr } = yield node_1.exec('ls');
        if (stderr) {
            throw new Error('Error validating if project is empty');
        }
        return !stdout.length;
    });
}
exports.isEmptyWorkspace = isEmptyWorkspace;
// TODO: workspace change listener
function openReadme() {
    return __awaiter(this, void 0, void 0, function* () {
        const { stderr } = yield node_1.exec('ls');
        if (stderr) {
            throw new Error('Error looking for initial file');
        }
        const file = 'README.md';
        const filePath = path.join(vscode.workspace.rootPath || '', file);
        console.log('filePath', filePath);
        const hasReadme = yield node_1.exists(file);
        if (!hasReadme) {
            // add readme if none exists
            try {
                const content = '# Welcome to CodeRoad!';
                fs.writeFileSync(filePath, content, 'utf8');
            }
            catch (error) {
                throw new Error('Error writing READM.md');
            }
        }
        try {
            const openPath = vscode.Uri.parse(filePath);
            const doc = yield vscode.workspace.openTextDocument(openPath);
            yield vscode.window.showTextDocument(doc);
        }
        catch (error) {
            throw new Error('Error opening README doc');
        }
    });
}
exports.openReadme = openReadme;
//# sourceMappingURL=workspace.js.map