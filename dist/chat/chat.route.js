"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var chatRouter = express_1.default.Router();
var chat_controller_1 = require("./chat.controller");
var logCon = new chat_controller_1.ChatController();
function ChatRoute() {
    chatRouter.route('/')
        .get(logCon.getAllHealth);
    chatRouter.route('/msgs')
        .get(logCon.getChats);
    return chatRouter;
}
exports.default = ChatRoute();
//# sourceMappingURL=chat.route.js.map