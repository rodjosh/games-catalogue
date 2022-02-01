"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signup_1 = __importDefault(require("./routes/signup"));
const login_1 = __importDefault(require("./routes/login"));
const reviews_1 = require("./routes/reviews");
const games_1 = require("./routes/games");
const routes = {
    signup: signup_1.default,
    login: login_1.default,
    addReview: reviews_1.addReview,
    getReviews: reviews_1.getReviews,
    rated: games_1.rated,
    genres: games_1.genres
};
exports.default = routes;
