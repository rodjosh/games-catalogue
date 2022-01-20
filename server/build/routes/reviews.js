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
const reviewsModel = database_1.dbmodels.Review;
//rrn is req, res & next
function checkInput(rrn) {
    const { author, rate, description, game_id } = rrn.req.body;
    //Validation for wrong types
    validation.wrongType(rrn.req.body, {
        author: "string",
        rate: "number",
        description: "string",
        game_id: "number"
    });
    /*
    Note: empty integers field will fall on wrongtype due to being
    empty got assign "undefined"
    */
    //Validation for empty values (Only strings)
    validation.empty(author, description);
    //Validation for special chars
    validation.specialChars(author);
}
function addReview(rrn) {
    return __awaiter(this, void 0, void 0, function* () {
        //Check user input to be valid
        if (validation.asyncError(checkInput, rrn))
            return;
        //Saving params
        const { author, rate, description, game_id } = rrn.req.body;
        //Storing the user in the database
        const review = reviewsModel.build({
            author: author,
            rate: rate,
            description: description,
            game_id: game_id
        });
        review.save()
            .then(() => {
            rrn.res.send("Review successfully added");
        }).catch((e) => {
            rrn.next(e);
        });
    });
}
exports.default = addReview;
