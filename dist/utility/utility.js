"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utiliy = void 0;
var multer_1 = __importDefault(require("multer"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
var Utiliy = /** @class */ (function () {
    function Utiliy() {
        this.secret = process.env.SECRET;
        this.fileUpload = this.fileUpload.bind(this);
        this.getLoggedInUser = this.getLoggedInUser.bind(this);
    }
    Utiliy.prototype.getLoggedInUser = function (req, res, next) {
        if (!req.header('Authorization')) {
            var e = this.errorfunc('no user logged in', 400);
            return next(e);
        }
        var token = req.header('Authorization').split(' ')[1];
        jsonwebtoken_1.default.verify(token, this.secret, (function (err, decoded) {
            if (decoded)
                req.query.UserId = decoded.id;
        }));
        next();
    };
    Utiliy.prototype.fileUpload = function () {
        var storage = this.storage();
        var fileFilter = this.fillterby();
        var upload = (0, multer_1.default)({ storage: storage, limits: {
                fileSize: 1024 * 1024 * 5,
            }, fileFilter: fileFilter
        });
        return upload;
    };
    Utiliy.prototype.storage = function () {
        var storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
            }
        });
        return storage;
    };
    Utiliy.prototype.fillterby = function () {
        var fileFilter = function (req, file, cb) {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true);
            }
            else {
                //we throw new Error(" here");
                cb(new Error('unsupported format'), false);
            }
        };
        return fileFilter;
    };
    Utiliy.prototype.errorfunc = function (msg, code) {
        var err = new Error(msg);
        err.statusCode = code;
        return err;
    };
    return Utiliy;
}());
exports.Utiliy = Utiliy;
//# sourceMappingURL=utility.js.map