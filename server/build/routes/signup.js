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
Object.defineProperty(exports, "__esModule", { value: true });
const validation = __importStar(require("../validation"));
const database_1 = require("../database");
const userModel = database_1.dbmodels.User;
const bcrypt = __importStar(require("bcrypt"));
function checkInput(rrn) {
    const { name, age, username, email, gender, password } = rrn.req.body;
    validation.wrongType(rrn.req.body, {
        name: "string",
        username: "string",
        email: "string",
        gender: "string",
        age: "number",
        password: "string"
    });
    validation.empty(name, username, email, gender, password);
    validation.hasSpaces(username, email);
    validation.specialChars(name, username, email, gender);
}
function signup(rrn) {
    return __awaiter(this, void 0, void 0, function* () {
        if (validation.asyncError(checkInput, rrn))
            return;
        const { name, username, email, gender, age, password } = rrn.req.body;
        // To encrypt user password
        const saltRounds = 10;
        const hashedPassword = yield bcrypt.hash(password, saltRounds);
        // To store the user in the database
        const user = userModel.build({
            name: name,
            username: username,
            email: email,
            gender: gender,
            age: age,
            password: hashedPassword
        });
        user.save()
            .then(() => {
            rrn.res.send("Succesfully registered");
        }).catch((e) => {
            rrn.next(new Error("User already exists"));
        });
    });
}
exports.default = signup;
