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
var regUsers_controller_1 = require("../regUsers.controller");
var req, res, next;
describe('Regsiter Controller', function () {
    beforeEach(function () {
        res = {};
        res.status = jest.fn(function (x) { return res; });
        res.send = jest.fn(function (x) { return res; });
        req = {
            body: {
                firstname: 'prince',
                lastname: 'acquah',
                email: 'info@gmail.com',
                password: '123456',
                status: 'user'
            }
        };
        next = jest.fn();
    });
    test('main function calls the validCredentails function to check if the credentials are valid', function () {
        return __awaiter(this, void 0, void 0, function () {
            var reg, spy, spy2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reg = new regUsers_controller_1.RegController();
                        spy = jest.spyOn(reg, 'validCredentials');
                        spy2 = jest.spyOn(reg, 'insertIntoDb').mockImplementation(function (data) { return Promise.resolve(''); });
                        return [4 /*yield*/, reg.main(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(spy).toHaveBeenCalledTimes(1);
                        expect(spy).toHaveBeenCalledWith(req.body);
                        return [2 /*return*/];
                }
            });
        });
    });
    test('main function calls the errorfunc function when credentials are invalid,  with the appropriate error msg and 300 status code ', function () {
        return __awaiter(this, void 0, void 0, function () {
            var reg, spy, spy2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reg = new regUsers_controller_1.RegController();
                        spy = jest.spyOn(reg, 'errorfunc');
                        spy2 = jest.spyOn(reg, 'insertIntoDb').mockImplementation(function (data) { return Promise.resolve(''); });
                        return [4 /*yield*/, reg.main(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(spy).toHaveBeenCalledTimes(1);
                        expect(spy).toHaveBeenCalledWith('pic is required', 300);
                        expect(next).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        });
    });
    test('main function calls the express next function ', function () {
        return __awaiter(this, void 0, void 0, function () {
            var reg, spy2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reg = new regUsers_controller_1.RegController();
                        spy2 = jest.spyOn(reg, 'insertIntoDb').mockImplementation(function (data) { return Promise.resolve(''); });
                        return [4 /*yield*/, reg.main(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(next).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        });
    });
    test('main function calls the insertIntoDb function when credentials are valid ', function () {
        return __awaiter(this, void 0, void 0, function () {
            var reg, spy2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.body.pic = 'jfsaopjaspoejo';
                        reg = new regUsers_controller_1.RegController();
                        spy2 = jest.spyOn(reg, 'insertIntoDb').mockImplementation(function (data) { return Promise.resolve(''); });
                        return [4 /*yield*/, reg.main(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(spy2).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        });
    });
    test('main function calls the hashpassword function which hash the password ', function () {
        return __awaiter(this, void 0, void 0, function () {
            var reg, spy1, spy2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.body.pic = 'jfsaopjaspoejo';
                        reg = new regUsers_controller_1.RegController();
                        spy1 = jest.spyOn(reg, 'hashPassword');
                        spy2 = jest.spyOn(reg, 'insertIntoDb').mockImplementation(function (data) { return Promise.resolve(''); });
                        return [4 /*yield*/, reg.main(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(spy1).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        });
    });
    test('main function sets the res.status to 201 when credentials are valid ', function () {
        return __awaiter(this, void 0, void 0, function () {
            var reg, spy2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req.body.pic = 'jfsaopjaspoejo';
                        reg = new regUsers_controller_1.RegController();
                        spy2 = jest.spyOn(reg, 'insertIntoDb').mockImplementation(function (data) { return Promise.resolve('user'); });
                        return [4 /*yield*/, reg.main(req, res, next)];
                    case 1:
                        _a.sent();
                        expect(res.status).toHaveBeenCalledWith(201);
                        expect(res.status(200).send).toHaveBeenCalledWith({ msg: 'user created', user: 'user' });
                        return [2 /*return*/];
                }
            });
        });
    });
    test('error function creates a new Error with the msg assigned and sets the statuscode to the err ', function () {
        var reg = new regUsers_controller_1.RegController();
        var msg = 'error';
        var response = reg.errorfunc(msg, 300);
        expect(response.message).toBe(msg);
        expect(response.statusCode).toBe(300);
    });
});
//# sourceMappingURL=controller.spec.js.map