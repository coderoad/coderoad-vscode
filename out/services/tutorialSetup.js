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
const position = require("../services/position");
const storage = require("../services/storage");
const workspace_1 = require("../utils/workspace");
const git_1 = require("../services/git");
const testRepo = 'https://github.com/ShMcK/coderoad-tutorial-basic.git';
function initializeTutorial(tutorial) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: refactor to allow client to call initialization
        const pos = yield position.getInitial(tutorial);
        // eslint-disable-next-line
        const { steps } = tutorial.data;
        const { setup } = steps[pos.stepId].actions;
        yield git_1.gitLoadCommits(setup);
    });
}
function tutorialSetup(tutorial) {
    return __awaiter(this, void 0, void 0, function* () {
        yield workspace_1.isEmptyWorkspace();
        yield git_1.gitInitIfNotExists();
        yield Promise.all([git_1.gitSetupRemote(testRepo), storage.setTutorial(tutorial), storage.resetProgress()]);
        yield initializeTutorial(tutorial);
    });
}
exports.default = tutorialSetup;
//# sourceMappingURL=tutorialSetup.js.map