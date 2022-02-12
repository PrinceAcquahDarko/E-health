"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var regrouter = express_1.default.Router();
var regUsers_controller_1 = require("./regUsers.controller");
var regcon = new regUsers_controller_1.RegController();
var utility_1 = require("../utility/utility");
var util = new utility_1.Utiliy();
var upload = util.fileUpload();
// upload.single('pic'),
function Regroute() {
    regrouter.route('/')
        .post(regcon.main)
        .get(regcon.getAllHealth)
        .put(upload.single('pic'), regcon.UpdateUser);
    regrouter.route('/id')
        .get(regcon.getSingleUser);
    return regrouter;
}
exports.default = Regroute();
//# sourceMappingURL=regUsers.route.js.map