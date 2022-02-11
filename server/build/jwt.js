"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const jwt = __importStar(require("jsonwebtoken"));
const JWT_SECRET = env_1.default === null || env_1.default === void 0 ? void 0 : env_1.default.JWT_SECRET;
exports.default = {
    checkJWT(req, res, next) {
        const token = req.cookies.user_token;
        if (token) {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
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
        return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
    }
};
