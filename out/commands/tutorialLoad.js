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
const vscode = require("vscode");
const fetch_1 = require("../utils/fetch");
const tutorialSetup_1 = require("../services/tutorialSetup");
const position_1 = require("../services/position");
const storage = require("../services/storage");
const rootSetup_1 = require("../services/rootSetup");
const workspace_1 = require("../utils/workspace");
const git = require("../services/git");
/*
new
if current workspace is empty, use it
if not, open a new folder then start
*/
function continueTutorial() {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: verify that tutorial is loaded in workspace
        // TODO: verify progress
        // TODO: verify setup
        yield position_1.loadProgressPosition();
        yield workspace_1.openReadme();
    });
}
function newTutorial(tutorial) {
    return __awaiter(this, void 0, void 0, function* () {
        // if workspace isn't empty, clear it out if given permission
        const isEmpty = yield workspace_1.isEmptyWorkspace();
        if (!isEmpty) {
            // eslint-disable-next-line
            const options = ['Open a new folder', 'I\'ll clear the files and folders myself'];
            const shouldOpenFolder = yield vscode.window.showQuickPick(options);
            if (shouldOpenFolder === options[0]) {
                yield vscode.commands.executeCommand('vscode.openFolder');
            }
        }
        yield tutorialSetup_1.default(tutorial);
        yield workspace_1.openReadme();
    });
}
function onSaveHook(languageIds) {
    // trigger command on save
    vscode.workspace.onDidSaveTextDocument((document) => {
        if (languageIds.includes(document.languageId) && document.uri.scheme === 'file') {
            // do work
            vscode.commands.executeCommand('coderoad.test_run');
        }
    });
}
function validateCanContinue() {
    return __awaiter(this, void 0, void 0, function* () {
        // validate tutorial & progress found in local storage
        // validate git is setup with a remote
        const [tutorial, progress, hasGit, hasGitRemote] = yield Promise.all([
            storage.getTutorial(),
            storage.getProgress(),
            git.gitVersion(),
            git.gitCheckRemoteExists(),
        ]);
        return !!(tutorial && progress && hasGit && hasGitRemote);
    });
}
function tutorialLoad(context) {
    return __awaiter(this, void 0, void 0, function* () {
        // setup connection to workspace
        yield rootSetup_1.default(context);
        const modes = ['New'];
        const canContinue = yield validateCanContinue();
        if (canContinue) {
            modes.push('Continue');
        }
        const selectedMode = yield vscode.window.showQuickPick(modes);
        if (!selectedMode) {
            throw new Error('No mode selected');
            return;
        }
        // load tutorial summaries
        const tutorialsData = yield fetch_1.default({
            resource: 'getTutorialsSummary',
        });
        const selectableTutorials = Object.keys(tutorialsData).map(id => {
            const tutorial = tutorialsData[id];
            return {
                label: tutorial.title,
                description: tutorial.description,
                // detail: '', // optional additional info
                id,
            };
        });
        const selectedTutorial = yield vscode.window.showQuickPick(selectableTutorials);
        if (!selectedTutorial) {
            throw new Error('No tutorial selected');
        }
        // load specific tutorial
        const tutorial = yield fetch_1.default({
            resource: 'getTutorial',
            params: { id: selectedTutorial.id },
        });
        if (!tutorial) {
            throw new Error('No tutorial found');
        }
        switch (selectedMode) {
            // new tutorial
            case modes[0]:
                yield newTutorial(tutorial);
                break;
            // continue
            case modes[1]:
                yield continueTutorial();
                break;
        }
        // setup hook to run tests on save
        onSaveHook(tutorial.meta.languages);
        // TODO: start
    });
}
exports.default = tutorialLoad;
//# sourceMappingURL=tutorialLoad.js.map