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
const node_1 = require("../utils/node");
function clear() {
    return __awaiter(this, void 0, void 0, function* () {
        // remove all files including ignored
        // NOTE: Linux only
        const command = 'ls -A1 | xargs rm -rf';
        const { stderr } = yield node_1.exec(command);
        if (stderr) {
            console.error(stderr);
            throw new Error('Error removing all files & folders');
        }
    });
}
exports.clear = clear;
//# sourceMappingURL=fs.js.map