"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
var server_1 = require("./server");
var mongoose_1 = __importDefault(require("mongoose"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var chat_index_1 = __importDefault(require("./chat/chat.index"));
require("dotenv").config();
var URL = process.env.URL;
var PORT = process.env.PORT || 3000;
mongoose_1.default.connect(URL)
    .then(function (data) { return console.log('we connected'); })
    .catch(function (e) { return console.log(e); });
var httpServer = (0, http_1.createServer)(server_1.app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:4200"
    }
});
(0, chat_index_1.default)();
server_1.app.use(function (err, req, res, next) {
    console.log(err.message);
    return res.status(err.statusCode || 500).send(err.message);
});
httpServer.listen(PORT, function () { return console.log('we listening!!'); });
//# sourceMappingURL=app.js.map