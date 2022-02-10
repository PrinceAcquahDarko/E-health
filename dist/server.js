"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var docs_1 = __importDefault(require("./docs"));
var morgan_1 = __importDefault(require("morgan"));
var loginUsers_route_1 = __importDefault(require("./logInUsers/loginUsers.route"));
var regUsers_route_1 = __importDefault(require("./regUsers/regUsers.route"));
var chat_route_1 = __importDefault(require("./chat/chat.route"));
var app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use('/uploads', express_1.default.static('uploads'));
app.use('/api-register', regUsers_route_1.default);
app.use('/api-login', loginUsers_route_1.default);
app.use('/api-chat', chat_route_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.default));
//# sourceMappingURL=server.js.map