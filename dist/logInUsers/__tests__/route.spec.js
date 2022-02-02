"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var loginUsers_route_1 = __importDefault(require("../loginUsers.route"));
describe('loginUser router', function () {
    test('has crud routes', function () {
        var routes = [
            { path: '/', method: 'post' }
        ];
        routes.forEach(function (route) {
            var match = loginUsers_route_1.default.stack.find(function (s) { return s.route.path === route.path && s.route.methods[route.method]; });
            expect(match).toBeTruthy();
        });
    });
});
//# sourceMappingURL=route.spec.js.map