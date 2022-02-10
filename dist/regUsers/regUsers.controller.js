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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegController = void 0;
var joi_1 = __importDefault(require("joi"));
var regUsers_model_1 = __importDefault(require("./regUsers.model"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var RegController = /** @class */ (function () {
    function RegController() {
        this.Port = process.env.PORT || 'localhost:3000';
        this.secret = process.env.SECRET;
        this.main = this.main.bind(this);
    }
    RegController.prototype.main = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var data, num, validData, msg, err, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.body);
                        data = __assign({}, req.body);
                        data.status = 'health';
                        data.pic = 'assets/imgs/nurse3.jpg';
                        return [4 /*yield*/, this.getAllUsersdb()];
                    case 1:
                        num = _a.sent();
                        data.uniqueNum = num.length + 1;
                        console.log(data.uniqueNum, 'from unitq');
                        validData = this.validCredentials(data);
                        if (validData.error) {
                            msg = validData.error.details[0].message;
                            err = this.errorfunc(msg, 300);
                            return [2 /*return*/, next(err)];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        this.hashPassword(data);
                        return [4 /*yield*/, this.insertIntoDb(data)];
                    case 3:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, res.status(201).send({ msg: 'user created', user: user })];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RegController.prototype.insertIntoDb = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, savedUser, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = new regUsers_model_1.default(data);
                        return [4 /*yield*/, user.save()];
                    case 1:
                        savedUser = _a.sent();
                        token = jsonwebtoken_1.default.sign({ id: savedUser._id }, this.secret);
                        return [2 /*return*/, {
                                token: token,
                                status: user.status,
                                num: user.uniqueNum
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw (error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RegController.prototype.validCredentials = function (data) {
        var schema = joi_1.default.object({
            email: joi_1.default.string().required().email(),
            password: joi_1.default.string().min(6).required(),
            firstname: joi_1.default.string().required(),
            lastname: joi_1.default.string().required(),
            status: joi_1.default.string(),
            pic: joi_1.default.string(),
            uniqueNum: joi_1.default.number()
        });
        var ops = {
            errors: {
                wrap: {
                    label: ''
                }
            }
        };
        var validatedData = schema.validate(data, ops);
        return validatedData;
    };
    RegController.prototype.errorfunc = function (msg, code) {
        var err = new Error(msg);
        err.statusCode = code;
        return err;
    };
    RegController.prototype.hashPassword = function (data) {
        data.password = bcryptjs_1.default.hashSync(data.password, 8);
    };
    RegController.prototype.getAllHealth = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, regUsers_model_1.default.find({
                            status: 'health'
                        })];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.status(200).send({ users: users })];
                }
            });
        });
    };
    RegController.prototype.getAllUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                }
                catch (error) {
                    next(error);
                }
                return [2 /*return*/];
            });
        });
    };
    RegController.prototype.getAllUsersdb = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, regUsers_model_1.default.find()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                    case 2:
                        error_3 = _a.sent();
                        throw (error_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RegController;
}());
exports.RegController = RegController;
//# sourceMappingURL=regUsers.controller.js.map