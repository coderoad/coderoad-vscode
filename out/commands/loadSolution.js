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
const storage = require("../services/storage");
const git_1 = require("../services/git");
function loadSolution() {
    return __awaiter(this, void 0, void 0, function* () {
        const [position, tutorial] = yield Promise.all([
            storage.getPosition(),
            storage.getTutorial(),
        ]);
        if (!position) {
            throw new Error('No tutorial position state found');
        }
        if (!tutorial) {
            throw new Error('Local tutorial not found');
        }
        // eslint-disable-next-line
        const { solution } = tutorial.data.steps[position.stepId].actions;
        yield git_1.gitClear();
        yield git_1.gitLoadCommits(solution);
    });
}
exports.default = loadSolution;
//# sourceMappingURL=loadSolution.js.map