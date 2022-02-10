"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var SubsSchema = new Schema({
    to: {
        type: Number,
        required: true
    },
    from: {
        type: Number,
        required: true
    },
    subs: {
        type: Boolean,
        required: true
    },
    fromUser: {
        type: Schema.Types.ObjectId, ref: 'Euser', required: true
    },
    toUser: {
        type: Schema.Types.ObjectId, ref: 'Euser', required: true
    }
});
exports.default = mongoose_1.default.model('Subs', SubsSchema);
//# sourceMappingURL=subs.model.js.map