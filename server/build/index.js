"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const database = (0, database_1.default)();
//To check database connection
if (!database) {
    throw new Error("Cannot connect to the database");
}
const routes_1 = __importDefault(require("./routes"));
app.use((0, cors_1.default)());
//To parse body data and cookies
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const api = express_1.default.Router();
api.post('/signup', (req, res, next) => {
    routes_1.default.signup({ req, res, next });
});
api.post('/login', (req, res, next) => {
    routes_1.default.login({ req, res, next });
});
//To prevent non-authenticated users
const usersOnly = express_1.default.Router();
api.use(usersOnly);
//To attach jwt checking to users only endpoints
//usersOnly.use(jwt.check);
const reviews = express_1.default.Router();
usersOnly.use(reviews);
reviews.post('/addreview', (req, res, next) => {
    routes_1.default.addReview({ req, res, next });
});
reviews.post('/getreviews', (req, res, next) => {
    routes_1.default.getReviews({ req, res, next });
});
const games = express_1.default.Router();
usersOnly.use('/games', games);
games.get('/rated', (req, res, next) => {
    routes_1.default.rated({ req, res, next });
});
games.get('/genre/:genre', (req, res, next) => {
    routes_1.default.genres({ req, res, next }, req.params.genre);
});
app.use('/api', api);
//To handle errors
app.use((err, req, res, next) => {
    const message = "Error: " + err.message;
    res.status(500);
    res.send(message);
    console.log(message);
});
app.listen(3001, () => {
    console.log('Server listening on 3001');
});
