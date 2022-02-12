"use strict";
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
exports.ChatController = void 0;
var subs_model_1 = __importDefault(require("./subs.model"));
var chat_model_1 = __importDefault(require("./chat.model"));
var regUsers_model_1 = __importDefault(require("../regUsers/regUsers.model"));
var temp_chat_model_1 = __importDefault(require("./temp.chat.model"));
var notification_model_1 = __importDefault(require("./notification.model"));
var tempNoti_model_1 = __importDefault(require("./tempNoti.model"));
var ChatController = /** @class */ (function () {
    function ChatController() {
    }
    //all health workers you subscribed to
    ChatController.prototype.getAllHealth = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        users = void 0;
                        if (!(req.query.status === 'user')) return [3 /*break*/, 2];
                        return [4 /*yield*/, subs_model_1.default.find({
                                from: req.query.me,
                                subs: true
                            }).populate('toUser').populate('fromUser')];
                    case 1:
                        users = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, subs_model_1.default.find({
                            to: req.query.me,
                            subs: true
                        }).populate('fromUser').populate('toUser')];
                    case 3:
                        users = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, res.status(200).send({ users: users })];
                    case 5:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.getChats = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        users = void 0;
                        if (!(req.query.status === 'user')) return [3 /*break*/, 2];
                        return [4 /*yield*/, chat_model_1.default.find({
                                from: req.query.me,
                                to: req.query.to
                            })];
                    case 1:
                        users = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, chat_model_1.default.find({
                            from: req.query.to,
                            to: req.query.me
                        })];
                    case 3:
                        users = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, res.status(200).send({ users: users })];
                    case 5:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.saveChats = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, res, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        msg = new chat_model_1.default(data);
                        return [4 /*yield*/, msg.save()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_3 = _a.sent();
                        throw (error_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.saveTempChats = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, res, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        msg = new temp_chat_model_1.default(data);
                        return [4 /*yield*/, msg.save()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_4 = _a.sent();
                        throw (error_4);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.deleteTempChat = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, temp_chat_model_1.default.deleteMany({ to: id })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        throw (error_5);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.deleteTempNoti = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, tempNoti_model_1.default.deleteMany({ to: id })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        throw (error_6);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.getNotifications = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, notification_model_1.default.find({
                                to: req.query.to,
                            }).sort({ date: -1 })];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.status(200).send({ users: users })];
                    case 2:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.notification = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var notification, res, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        notification = new notification_model_1.default(id);
                        return [4 /*yield*/, notification.save()];
                    case 1:
                        res = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        throw (error_8);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.Tempnotification = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var notification, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        notification = new tempNoti_model_1.default(id);
                        return [4 /*yield*/, notification.save()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        throw (error_9);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.getTempNoti = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, tempNoti_model_1.default.find({
                                to: id
                            })];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                    case 2:
                        error_10 = _a.sent();
                        throw (error_10);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatController.prototype.getSaveTempChats = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, temp_chat_model_1.default.find({
                                to: id
                            })];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                    case 2:
                        error_11 = _a.sent();
                        throw (error_11);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //find unique num and save
    ChatController.prototype.saveSubs = function (to, from, body) {
        return __awaiter(this, void 0, void 0, function () {
            var fromUser, toUser, subs, saved, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, regUsers_model_1.default.findOne({
                                uniqueNum: from
                            })];
                    case 1:
                        fromUser = _a.sent();
                        return [4 /*yield*/, regUsers_model_1.default.findOne({
                                uniqueNum: to
                            })];
                    case 2:
                        toUser = _a.sent();
                        body.fromUser = fromUser;
                        body.toUser = toUser;
                        subs = new subs_model_1.default(body);
                        return [4 /*yield*/, subs.save()];
                    case 3:
                        saved = _a.sent();
                        return [2 /*return*/, saved];
                    case 4:
                        error_12 = _a.sent();
                        throw (error_12);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ChatController;
}());
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map