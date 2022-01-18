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
//Data validator
const validation = __importStar(require("../validation"));
//Importing database models
const database_1 = require("../database");
const userModel = database_1.dbmodels.User;
//Password encrypter
const bcrypt = __importStar(require("bcrypt"));
//rrn is req, res & next
function checkInput(rrn) {
    const { username, password } = rrn.req.body;
    //Validation for wrong types
    validation.wrongType(rrn.req.body, {
        username: "string",
        password: "string"
    });
    //Validation for empty values
    validation.empty(username, password);
    //Validation for spaces
    validation.hasSpaces(username);
    //Validation for special chars
    validation.specialChars(username);
}
function signup(rrn) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check user input to be valid
        checkInput(rrn);
        //Saving params
        const { username, password } = rrn.req.body;
        //Retrieven users that matchs username
        const user = yield userModel.findOne({
            where: {
                username: username
            }
        });
        //If no users then username doesn't exists
        if (!user)
            return rrn.next(new Error("User doesn't exist"));
        //Comparing passwords
        const hashedPassword = user.get('password');
        const result = yield bcrypt.compare(password, hashedPassword);
        //If passwords match then send success message
        if (result) {
            return rrn.res.send('Successfully logged');
        }
        //If passwords doesn't match then send error message
        rrn.next(new Error('Password doesn\'t match'));
    });
}
exports.default = signup;
