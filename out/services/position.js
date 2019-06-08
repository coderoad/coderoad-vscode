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
const storage = require("./storage");
function getInitial(tutorial) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = tutorial;
        const levelId = data.summary.levelList[0];
        const stageId = data.levels[levelId].stageList[0];
        const stepId = data.stages[stageId].stepList[0];
        const position = {
            levelId,
            stageId,
            stepId,
        };
        storage.setPosition(position);
        return position;
    });
}
exports.getInitial = getInitial;
function loadProgressPosition() {
    return __awaiter(this, void 0, void 0, function* () {
        const [tutorial, progress] = yield Promise.all([storage.getTutorial(), storage.getProgress()]);
        if (!tutorial) {
            throw new Error('No tutorial found');
        }
        // already complete
        if (progress.complete) {
            return;
        }
        const { data: { summary, levels, stages }, } = tutorial;
        // loop over levels to find first incomplete
        const currentLevelId = summary.levelList.find((levelId) => !progress.levels[levelId]);
        if (!currentLevelId) {
            throw new Error('Current level not found');
        }
        // loop over stages to find first incomplete
        const currentStageId = levels[currentLevelId].stageList.find((stageId) => !progress.stages[stageId]);
        if (!currentStageId) {
            throw new Error('Current stage not found');
        }
        // loop over steps to find first incomplete
        const currentStepId = stages[currentStageId].stepList.find((stepId) => !progress.steps[stepId]);
        if (!currentStepId) {
            throw new Error('Current step not found');
        }
        const position = {
            levelId: currentLevelId,
            stageId: currentStageId,
            stepId: currentStepId,
        };
        storage.setPosition(position);
    });
}
exports.loadProgressPosition = loadProgressPosition;
function getPrev() {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.getPrev = getPrev;
//# sourceMappingURL=position.js.map