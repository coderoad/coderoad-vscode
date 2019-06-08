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
const storage = require("./storage");
function onSuccess(position) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('onSuccess', position);
        vscode.window.showInformationMessage('SUCCESS');
        // calculate progress changes
        const [progress, tutorial] = yield Promise.all([storage.getProgress(), storage.getTutorial()]);
        if (!tutorial) {
            throw new Error('No tutorial found');
        }
        if (!position.stepId) {
            throw new Error('No step position found');
        }
        const { data } = tutorial;
        // step complete
        const nextProgress = progress;
        nextProgress.steps[position.stepId] = true;
        // is stage complete
        const steps = data.stages[position.stageId].stepList;
        const isStageComplete = progress.stages[position.stageId] || steps[steps.length - 1] === position.stepId;
        nextProgress.stages[position.stageId] = isStageComplete;
        // is level complete
        if (isStageComplete) {
            const stages = data.levels[position.levelId].stageList;
            const isLevelComplete = progress.levels[position.levelId] || stages[stages.length - 1] === position.stageId;
            nextProgress.levels[position.levelId] = isLevelComplete;
            if (isLevelComplete) {
                const levels = data.summary.levelList;
                const isTutorialComplete = progress.complete || levels[levels.length - 1] === position.levelId;
                nextProgress.complete = isTutorialComplete;
            }
        }
        console.log('nextProgress', nextProgress);
        // update ls progress
        storage.updateProgress(nextProgress);
        // send({ type: 'STEP_COMPLETE', payload: { progress: nextProgress } })
    });
}
exports.onSuccess = onSuccess;
function onFailure() {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: capture analytics on stepId
        vscode.window.showWarningMessage('FAIL');
    });
}
exports.onFailure = onFailure;
//# sourceMappingURL=testResult.js.map