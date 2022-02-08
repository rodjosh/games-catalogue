"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const JWT_SECRET = env_1.default === null || env_1.default === void 0 ? void 0 : env_1.default.JWT_SECRET;
exports.default = {
    checkJWT() {
    },
};
