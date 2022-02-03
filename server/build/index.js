"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const database = (0, database_1.default)();
//Checking database connection
if (!database) {
    throw new Error("Cannot connect to the database");
}
//API routes manager
const routes_1 = __importDefault(require("./routes"));
//API router
const api = express_1.default.Router();
//Enable CORS
api.use((0, cors_1.default)());
//Parsing json body requests
api.use(express_1.default.json());
//Handling api requests with routes
api.post('/signup', (req, res, next) => {
    routes_1.default.signup({ req, res, next });
});
api.post('/login', (req, res, next) => {
    routes_1.default.login({ req, res, next });
});
api.post('/addreview', (req, res, next) => {
    routes_1.default.addReview({ req, res, next });
});
api.post('/getreviews', (req, res, next) => {
    routes_1.default.getReviews({ req, res, next });
});
const games = express_1.default.Router();
api.use('/games', games);
games.get('/rated', (req, res, next) => {
    routes_1.default.rated({ req, res, next });
});
games.get('/genre/:genre', (req, res, next) => {
    routes_1.default.genres({ req, res, next }, req.params.genre);
});
//Implementing routing
app.use('/api', api);
//Error handling
app.use((err, req, res, next) => {
    const message = "Error: " + err.message;
    res.status(500);
    res.send(message);
    console.log(message);
});
//Starting up the server
app.listen(3001, () => {
    console.log('Listening on 3001');
});
