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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../app");
require("dotenv").config();
var secret = process.env.SECRET;
var chat_controller_1 = require("./chat.controller");
var ch = new chat_controller_1.ChatController();
function chat() {
    var _this = this;
    console.log('heyyyy');
    app_1.io.use(function (socket, next) {
        var count = Math.random() * 10;
        var userId = socket.handshake.auth.userId;
        if (userId) {
            socket.userID = userId;
            // socket.connection = true
            return next();
        }
        socket.userID = count;
        count += 1;
        next();
    });
    app_1.io.on("connection", function (socket) { return __awaiter(_this, void 0, void 0, function () {
        var users, _a, _b, _c, id, socket_1, tempChat, tempNoti;
        var e_1, _d;
        var _this = this;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    socket.emit('session', {
                        key: socket.userID
                    });
                    socket.join(socket.userID);
                    users = [];
                    try {
                        for (_a = __values(app_1.io.of("/").sockets), _b = _a.next(); !_b.done; _b = _a.next()) {
                            _c = __read(_b.value, 2), id = _c[0], socket_1 = _c[1];
                            users.push({
                                userID: id,
                                id: socket_1.handshake.auth.userId
                            });
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    socket.emit("users", users);
                    return [4 /*yield*/, ch.getSaveTempChats(socket.userID)];
                case 1:
                    tempChat = _e.sent();
                    if (!tempChat.length) return [3 /*break*/, 3];
                    tempChat.forEach(function (chat) {
                        socket.emit("savedChats", chat);
                    });
                    return [4 /*yield*/, ch.deleteTempChat(socket.userID)];
                case 2:
                    _e.sent();
                    _e.label = 3;
                case 3: return [4 /*yield*/, ch.getTempNoti(socket.userID)];
                case 4:
                    tempNoti = _e.sent();
                    console.log(tempNoti, 'from tempNoti..');
                    if (!tempNoti.length) return [3 /*break*/, 6];
                    tempNoti.forEach(function (chat) {
                        socket.emit("savedNoti", chat);
                    });
                    return [4 /*yield*/, ch.deleteTempNoti(socket.userID)];
                case 5:
                    _e.sent();
                    _e.label = 6;
                case 6:
                    socket.broadcast.emit("user connected", {
                        userID: socket.id,
                        id: socket.handshake.auth.userId
                    });
                    socket.on("request message", function (data) { return __awaiter(_this, void 0, void 0, function () {
                        var notifi;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    notifi = {
                                        to: data.to,
                                        from: data.from,
                                        day: data.day,
                                        msg: 'you have a new chat request'
                                    };
                                    return [4 /*yield*/, ch.notification(notifi)];
                                case 1:
                                    _a.sent();
                                    if (!data.connection) return [3 /*break*/, 2];
                                    socket.to(data.to).emit("request message", {
                                        content: data.content,
                                        from: socket.userID,
                                    });
                                    return [3 /*break*/, 4];
                                case 2:
                                    console.log('you are not online');
                                    return [4 /*yield*/, ch.Tempnotification(notifi)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    socket.on("confirm message", function (data) { return __awaiter(_this, void 0, void 0, function () {
                        var noti, from, to, body, res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    noti = {
                                        to: data.to,
                                        from: data.from,
                                        day: data.day,
                                        msg: 'Your chat request has been accepted'
                                    };
                                    return [4 /*yield*/, ch.notification(noti)];
                                case 1:
                                    _a.sent();
                                    from = data.to //since we wanna store in the db the 'to' becomes the 'from' as in the confirm msg is been sent from the doctor to the user so in the db the user becomes the from
                                    ;
                                    to = data.from;
                                    body = {
                                        to: to,
                                        from: from,
                                        subs: true
                                    };
                                    return [4 /*yield*/, ch.saveSubs(to, from, body)
                                        // let subs = new ChatSchema(body)
                                        // let saved =  await subs.save()
                                    ];
                                case 2:
                                    res = _a.sent();
                                    // let subs = new ChatSchema(body)
                                    // let saved =  await subs.save()
                                    console.log(res);
                                    if (!data.connection) return [3 /*break*/, 3];
                                    socket.to(data.to).emit("confirm message", {
                                        content: data.content,
                                        from: socket.userID,
                                    });
                                    return [3 /*break*/, 5];
                                case 3:
                                    console.log('you are not online from confirm message');
                                    //save to a temporal db
                                    return [4 /*yield*/, ch.Tempnotification(noti)];
                                case 4:
                                    //save to a temporal db
                                    _a.sent();
                                    _a.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    socket.on("private message", function (data) { return __awaiter(_this, void 0, void 0, function () {
                        var content, obj, res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    content = {
                                        content: data.content,
                                        from: socket.userID,
                                        to: data.to,
                                        textSort: socket.userID,
                                        day: data.day
                                    };
                                    console.log(data.day, 'from data.day');
                                    console.log(Date.now(), 'from data.day');
                                    if (data.health) {
                                        content.from = data.to;
                                        content.to = socket.userID;
                                    }
                                    return [4 /*yield*/, ch.saveChats(content)];
                                case 1:
                                    _a.sent();
                                    console.log(data.connection, 'from socket.connection');
                                    if (!data.connection) return [3 /*break*/, 2];
                                    socket.to(data.to).emit("private message", {
                                        content: data.content,
                                        from: socket.userID,
                                    });
                                    return [3 /*break*/, 4];
                                case 2:
                                    obj = {
                                        to: data.to,
                                        from: socket.userID,
                                        content: data.content
                                    };
                                    console.log('because you are not connected i console.logged you');
                                    return [4 /*yield*/, ch.saveTempChats(obj)];
                                case 3:
                                    res = _a.sent();
                                    console.log(res);
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    // socket.on("disconnect", async () => {
                    //   const matchingSockets = await io.in(socket.userID).allSockets();
                    //   const isDisconnected = matchingSockets.size === 0;
                    //   if (isDisconnected) {
                    //     // notify other users
                    //     console.log(socket.userID, 'user disconnected')
                    //     socket.broadcast.emit("user disconnected", socket.userID);
                    //   }
                    // });
                    socket.on("disconnect", function () { return __awaiter(_this, void 0, void 0, function () {
                        var matchingSockets, isDisconnected;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, app_1.io.in(socket.userID).allSockets()];
                                case 1:
                                    matchingSockets = _a.sent();
                                    isDisconnected = matchingSockets.size === 0;
                                    if (isDisconnected) {
                                        // notify other users
                                        socket.broadcast.emit("user disconnected", socket.userID);
                                        // update the connection status of the session
                                        // socket.connection = false
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.default = chat;
//# sourceMappingURL=chat.index.js.map