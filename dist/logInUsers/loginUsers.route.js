"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logrouter = express_1.default.Router();
var loginUsers_controller_1 = require("./loginUsers.controller");
var logCon = new loginUsers_controller_1.loginController();
function Regroute() {
    logrouter.route('/')
        .post(logCon.mainLogin);
    return logrouter;
}
exports.default = Regroute();
//# sourceMappingURL=loginUsers.route.js.map