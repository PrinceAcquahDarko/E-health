"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['user', 'health'],
        default: 'user'
    },
    password: {
        type: String,
        required: true
    },
    work: {
        type: String,
    },
    profession: {
        type: String,
    },
    description: {
        type: String,
    },
    pic: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model('Euser', UserSchema);
//# sourceMappingURL=regUsers.model.js.map