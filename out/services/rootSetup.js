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
const storage_1 = require("./storage");
function setupRoot(context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield node_1.setWorkspaceRoot();
        yield storage_1.setStorage(context.workspaceState);
    });
}
exports.default = setupRoot;
//# sourceMappingURL=rootSetup.js.map