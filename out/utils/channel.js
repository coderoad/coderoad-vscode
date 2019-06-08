"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
let _channel;
exports.getOutputChannel = (name) => {
    if (!_channel) {
        _channel = vscode.window.createOutputChannel(name);
    }
    return _channel;
};
//# sourceMappingURL=channel.js.map