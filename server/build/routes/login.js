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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = void 0;
const validation = __importStar(require("../validation"));
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = __importDefault(require("../jwt"));
const database_1 = require("../database");
const userModel = database_1.dbmodels.User;
function getUserFromBody(rrn) {
    const username = rrn.req.body.username;
    const password = rrn.req.body.password;
    return { username, password };
}
function checkInput(rrn) {
    const user = getUserFromBody(rrn);
    validation.wrongType(rrn.req.body, {
        username: "string",
        password: "string"
    });
    validation.empty(user.username, user.password);
    validation.hasSpaces(user.username);
    validation.specialChars(user.username);
}
function login(rrn) {
    return __awaiter(this, void 0, void 0, function* () {
        //To check if input match with predefined scheme and types
        if (validation.asyncError(checkInput, rrn))
            return;
        const { username, password } = rrn.req.body;
        //To retrieve user information if exists in the database
        const user = yield userModel.findOne({
            where: {
                username: username
            }
        });
        if (!user)
            return rrn.next(new Error("User doesn't exist"));
        // To compare passwords
        const hashedPassword = user.get('password');
        const result = yield bcrypt.compare(password, hashedPassword);
        if (result) {
            const jwt_token = jwt_1.default.createJWT({ user: username });
            rrn.res.cookie('user_token', jwt_token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            return rrn.res.send(jwt_token);
        }
        rrn.next(new Error('Password doesn\'t match'));
    });
}
exports.default = login;
function checkLogin(rrn) {
    return __awaiter(this, void 0, void 0, function* () {
        rrn.res.send("You're logged");
    });
}
exports.checkLogin = checkLogin;
