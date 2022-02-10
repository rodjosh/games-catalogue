"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = env_1.default === null || env_1.default === void 0 ? void 0 : env_1.default.JWT_SECRET;
exports.default = {
    checkJWT(req, res, next) {
        if (req.cookies.user_token) {
            jsonwebtoken_1.default.verify(req.cookies.user_token, JWT_SECRET, (err, decoded) => {
                if (err)
                    throw new Error("Invalid token");
                const payload = decoded;
                res.locals.username = payload.user;
                next();
            });
        }
        else {
            throw new Error("Not authorized to view this content");
        }
    },
    createJWT(payload) {
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "24h" });
    }
};
