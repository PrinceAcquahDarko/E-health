"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ChatSchema = new mongoose_1.default.Schema({
    to: {
        type: Number,
        required: true
    },
    from: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    textSort: {
        type: Number,
        required: true
    },
    day: {
        type: String,
        required: true,
    }
});
exports.default = mongoose_1.default.model('Chat', ChatSchema);
//# sourceMappingURL=chat.model.js.map