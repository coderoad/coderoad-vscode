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
// temporary tutorials
const basic_1 = require("../tutorials/basic");
const tutorialsData = {
    tutorialId: basic_1.default,
};
// TODO: replace with fetch resource
function fetch(options) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('options', options);
        switch (options.resource) {
            case 'getTutorialsSummary':
                // list of ids with summaries
                let data = {};
                for (const tutorial of Object.values(tutorialsData)) {
                    data[tutorial.id] = tutorial.data.summary;
                }
                return data;
            case 'getTutorial':
                // specific tutorial by id
                return tutorialsData[options.params.id];
            default:
                throw new Error('Resource not found');
        }
    });
}
exports.default = fetch;
//# sourceMappingURL=fetch.js.map