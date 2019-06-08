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
let storage;
// storage must be set initially
function setStorage(workspaceState) {
    storage = workspaceState;
}
exports.setStorage = setStorage;
// TUTORIAL
const STORE_TUTORIAL = 'coderoad:tutorial';
function getTutorial() {
    return __awaiter(this, void 0, void 0, function* () {
        return storage.get(STORE_TUTORIAL);
    });
}
exports.getTutorial = getTutorial;
function setTutorial(tutorial) {
    return __awaiter(this, void 0, void 0, function* () {
        yield storage.update(STORE_TUTORIAL, tutorial);
    });
}
exports.setTutorial = setTutorial;
// POSITION
const STORE_POSITION = 'coderoad:position';
const defaultPosition = { levelId: '', stageId: '', stepId: '' };
function getPosition() {
    return __awaiter(this, void 0, void 0, function* () {
        const position = storage.get(STORE_POSITION);
        return position || defaultPosition;
    });
}
exports.getPosition = getPosition;
function setPosition(position) {
    return __awaiter(this, void 0, void 0, function* () {
        yield storage.update(STORE_POSITION, position);
    });
}
exports.setPosition = setPosition;
// PROGRESS
const STORE_PROGRESS = 'coderoad:progress';
const defaultProgress = { levels: {}, stages: {}, steps: {}, hints: {}, complete: false };
function getProgress() {
    return __awaiter(this, void 0, void 0, function* () {
        const progress = yield storage.get(STORE_PROGRESS);
        return progress || defaultProgress;
    });
}
exports.getProgress = getProgress;
function resetProgress() {
    return __awaiter(this, void 0, void 0, function* () {
        yield storage.update(STORE_PROGRESS, defaultProgress);
    });
}
exports.resetProgress = resetProgress;
function updateProgress(record) {
    return __awaiter(this, void 0, void 0, function* () {
        const progress = yield getProgress();
        if (record.levels) {
            progress.levels = Object.assign({}, progress.levels, record.levels);
        }
        if (record.stages) {
            progress.stages = Object.assign({}, progress.stages, record.stages);
        }
        if (record.steps) {
            progress.steps = Object.assign({}, progress.steps, record.steps);
        }
        yield storage.update(STORE_PROGRESS, progress);
    });
}
exports.updateProgress = updateProgress;
//# sourceMappingURL=storage.js.map