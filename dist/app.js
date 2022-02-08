"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
var URL = process.env.URL;
var PORT = process.env.PORT || 3000;
mongoose_1.default.connect(URL)
    .then(function (data) { return console.log('we connected'); })
    .catch(function (e) { return console.log(e); });
server_1.app.use(function (err, req, res, next) {
    console.log(err.message);
    return res.status(err.statusCode || 500).send(err.message);
});
server_1.app.listen(PORT, function () { return console.log('we listening!!'); });
//# sourceMappingURL=app.js.map