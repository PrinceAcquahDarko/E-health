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
Object.defineProperty(exports, "__esModule", { value: true });
var getUsers_1 = require("./getUsers");
var info = {
    paths: {
        '/api-register': __assign({}, getUsers_1.Users)
    }
};
exports.default = info;
//# sourceMappingURL=index.js.map