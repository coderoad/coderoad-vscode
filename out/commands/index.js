"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const runTest_1 = require("./runTest");
const tutorialLoad_1 = require("./tutorialLoad");
const loadSolution_1 = require("./loadSolution");
// import quit from './quit'
const COMMANDS = {
    TUTORIAL_SETUP: 'coderoad.tutorial_setup',
    TUTORIAL_LOAD: 'coderoad.tutorial_load',
    RUN_TEST: 'coderoad.test_run',
    LOAD_SOLUTION: 'coderoad.solution_load',
};
exports.default = (context) => {
    const commands = {
        [COMMANDS.TUTORIAL_LOAD]() {
            tutorialLoad_1.default(context);
        },
        [COMMANDS.RUN_TEST]: runTest_1.default,
        [COMMANDS.LOAD_SOLUTION]: loadSolution_1.default,
    };
    for (const cmd in commands) {
        const command = vscode.commands.registerCommand(cmd, commands[cmd]);
        context.subscriptions.push(command);
    }
};
//# sourceMappingURL=index.js.map