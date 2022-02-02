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
Object.defineProperty(exports, "__esModule", { value: true });
var loginUsers_controller_1 = require("../loginUsers.controller");
var req, res, next;
describe('loginController', function () {
    beforeEach(function () {
        res = {};
        res.status = jest.fn(function (x) { return res; });
        res.send = jest.fn(function (x) { return res; });
        req = {
            body: {
                email: 'info@gmail.com',
                password: '123456'
            }
        };
        next = jest.fn();
    });
    test('mainLogin calls the validatefunction to validate credentials', function () {
        return __awaiter(this, void 0, void 0, function () {
            var log, spy, spy2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log = new loginUsers_controller_1.loginController();
                        spy = jest.spyOn(log, 'validateData');
                        spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation(function (data) { return Promise.resolve(''); });
                        return [4 /*yield*/, log.mainLogin(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(spy).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        });
    });
    test('mainLogin calls the errorfunc and sets the msg to the appropriate err msg with a 300 code if not valid credentials provided(email)', function () {
        return __awaiter(this, void 0, void 0, function () {
            var log, spy, spy2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log = new loginUsers_controller_1.loginController();
                        req.body.email = 'prince';
                        spy = jest.spyOn(log, 'errorfunc');
                        spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation(function (data) { return Promise.resolve(''); });
                        return [4 /*yield*/, log.mainLogin(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(spy).toHaveBeenCalledTimes(1);
                        expect(spy).toHaveBeenCalledWith('email must be a valid email', 300);
                        return [2 /*return*/];
                }
            });
        });
    });
    test('mainLogin calls the errorfunc and sets the msg to no such email with a 400 code if no such email', function () {
        return __awaiter(this, void 0, void 0, function () {
            var log, spy, spy2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log = new loginUsers_controller_1.loginController();
                        spy = jest.spyOn(log, 'errorfunc');
                        spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation(function (data) { return Promise.resolve(''); });
                        return [4 /*yield*/, log.mainLogin(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(spy).toHaveBeenCalledTimes(1);
                        expect(spy).toHaveBeenCalledWith('no such user', 400);
                        return [2 /*return*/];
                }
            });
        });
    });
    test('mainLogin calls the comparePassword function if theres a valid user', function () {
        return __awaiter(this, void 0, void 0, function () {
            var log, spy2, spy3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log = new loginUsers_controller_1.loginController();
                        spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation(function (data) { return Promise.resolve('ZCX'); });
                        spy3 = jest.spyOn(log, 'comparePassword').mockImplementation(function (data) { return Promise.resolve(false); });
                        return [4 /*yield*/, log.mainLogin(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(spy3).toHaveBeenCalledTimes(1);
                        expect(spy3).toHaveBeenCalledWith(req.body, 'ZCX');
                        return [2 /*return*/];
                }
            });
        });
    });
    test('mainLogin calls the errorfunc and sets the msg passwords dont much with a 400 code if password is incorrect', function () {
        return __awaiter(this, void 0, void 0, function () {
            var log, spy, spy2, spy3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log = new loginUsers_controller_1.loginController();
                        spy = jest.spyOn(log, 'errorfunc');
                        spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation(function (data) { return Promise.resolve('ZCX'); });
                        spy3 = jest.spyOn(log, 'comparePassword').mockImplementation(function (data) { return Promise.resolve(false); });
                        return [4 /*yield*/, log.mainLogin(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(spy).toHaveBeenCalledTimes(1);
                        expect(spy).toHaveBeenCalledWith("passwords dont much", 300);
                        return [2 /*return*/];
                }
            });
        });
    });
    test('mainLogin calls the generateToken which generates jwt token if user is found', function () {
        return __awaiter(this, void 0, void 0, function () {
            var log, user, spy, spy2, spy3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log = new loginUsers_controller_1.loginController();
                        user = { _id: 1, status: 'user' };
                        spy = jest.spyOn(log, 'generateToken').mockImplementation(function (data) { return '12345'; });
                        spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation(function (data) { return Promise.resolve(user); });
                        spy3 = jest.spyOn(log, 'comparePassword').mockImplementation(function (data) { return Promise.resolve(true); });
                        return [4 /*yield*/, log.mainLogin(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(spy).toHaveBeenCalledTimes(1);
                        expect(spy).toHaveBeenCalledWith(user._id);
                        return [2 /*return*/];
                }
            });
        });
    });
    test('mainLogin calls res.status with 200 and send with a msg (successful) plus a response obj containing token and user status', function () {
        return __awaiter(this, void 0, void 0, function () {
            var log, user, spy, spy2, spy3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log = new loginUsers_controller_1.loginController();
                        user = { _id: 1, status: 'user' };
                        spy = jest.spyOn(log, 'generateToken').mockImplementation(function (data) { return '12345'; });
                        spy2 = jest.spyOn(log, 'getUserFromDb').mockImplementation(function (data) { return Promise.resolve(user); });
                        spy3 = jest.spyOn(log, 'comparePassword').mockImplementation(function (data) { return Promise.resolve(true); });
                        return [4 /*yield*/, log.mainLogin(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(res.status).toHaveBeenCalledTimes(1);
                        expect(res.status).toHaveBeenCalledWith(200);
                        expect(res.status(200).send).toHaveBeenCalledTimes(1);
                        expect(res.status(200).send).toHaveBeenCalledWith({ msg: 'succesful', response: { token: '12345', status: user.status } });
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=login.controller.spec.js.map