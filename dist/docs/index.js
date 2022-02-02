"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var basicInfo_1 = require("./basicInfo");
var servers_1 = require("./servers");
var tags_1 = require("./tags");
var component_1 = require("./component");
var users_1 = __importDefault(require("./users"));
var docs = __assign(__assign(__assign(__assign(__assign({}, basicInfo_1.basicInfo), servers_1.serve), component_1.compo), tags_1.Tags), users_1.default);
exports.default = docs;
//# sourceMappingURL=index.js.map