"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var regUsers_model_1 = __importDefault(require("../regUsers.model"));
describe('User', function () {
    describe('Schema', function () {
        test('firstname', function () {
            var firstname = regUsers_model_1.default.schema.obj.firstname;
            expect(firstname).toEqual({
                type: String,
                required: true,
                trim: true,
                maxlength: 50
            });
        });
        test('lastname', function () {
            var lastname = regUsers_model_1.default.schema.obj.lastname;
            expect(lastname).toEqual({
                type: String,
                required: true,
                trim: true,
                maxlength: 50
            });
        });
        test('email', function () {
            var email = regUsers_model_1.default.schema.obj.email;
            expect(email).toEqual({
                type: String,
                required: true,
                unique: true,
                trim: true
            });
        });
        test('status', function () {
            var status = regUsers_model_1.default.schema.obj.status;
            expect(status).toEqual({
                type: String,
                required: true,
                enum: ['user', 'health'],
                default: 'user'
            });
        });
        test('password', function () {
            var password = regUsers_model_1.default.schema.obj.password;
            expect(password).toEqual({
                type: String,
                required: true,
            });
        });
        test('work', function () {
            var work = regUsers_model_1.default.schema.obj.work;
            expect(work).toEqual({
                type: String,
            });
        });
        test('profession', function () {
            var profession = regUsers_model_1.default.schema.obj.profession;
            expect(profession).toEqual({
                type: String,
            });
        });
        test('description', function () {
            var description = regUsers_model_1.default.schema.obj.description;
            expect(description).toEqual({
                type: String,
            });
        });
    });
});
//# sourceMappingURL=model.spec.js.map