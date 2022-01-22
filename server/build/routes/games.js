"use strict";
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
exports.genres = exports.rated = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("dotenv");
//Setting up env file variables
(0, dotenv_1.config)({
    path: __dirname + '/../../../.env'
});
//rated, fighting, shooter, rpg, adventure
const games = {};
const games_url = 'https://api.igdb.com/v4/games';
function parseGame(list) {
    return list.map((game) => {
        return {
            name: game.name,
            cover: game.cover.url,
            genres: game.genres.map((genre) => genre.name),
            summary: game.summary,
            rating: game.total_rating.toFixed(2)
        };
    });
}
function getToken() {
    return __awaiter(this, void 0, void 0, function* () {
        //Request token from twitch API
        const response = (0, axios_1.default)({
            method: 'post',
            url: 'https://id.twitch.tv/oauth2/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`
        });
        //Check if the request is successful
        try {
            const result = yield response;
            return result.data.access_token;
        }
        catch (_a) {
            return false;
        }
    });
}
function rated(rrn) {
    return __awaiter(this, void 0, void 0, function* () {
        //Returning previous data if already loaded
        if (games.rated) {
            rrn.res.json(games.rated);
            return;
        }
        //Getting api token
        const token = yield getToken();
        //Return error if token request fails
        if (!token)
            return rrn.next(new Error('Problems creating token'));
        //Requesting API for games
        const response = (0, axios_1.default)({
            method: 'post',
            url: games_url,
            headers: {
                'Content-Type': 'text/plain',
                'Client-ID': `${process.env.CLIENT_ID}`,
                'Authorization': `Bearer ${token}`
            },
            data: `
			fields name, cover.url, genres.name, total_rating, summary;
			where total_rating_count > 1000;
			sort total_rating_count desc;
			sort total_rating desc;
		`
        });
        //Check if request is successful
        try {
            games.rated = parseGame((yield response).data);
            rrn.res.json(games.rated);
        }
        catch (e) {
            return rrn.next(e);
        }
    });
}
exports.rated = rated;
function genres(rrn, genre) {
    return __awaiter(this, void 0, void 0, function* () {
        //Returning previous data if already loaded
        if (games[genre]) {
            rrn.res.json(games[genre]);
            return;
        }
        //Getting api token
        const token = yield getToken();
        //Return error if token request fails
        if (!token)
            return rrn.next(new Error('Problems creating token'));
        //Requesting API for games
        const response = (0, axios_1.default)({
            method: 'post',
            url: games_url,
            headers: {
                'Content-Type': 'text/plain',
                'Client-ID': `${process.env.CLIENT_ID}`,
                'Authorization': `Bearer ${token}`
            },
            data: `
			fields name, cover.url, genres.name, total_rating, summary;
			where genres.slug = "${genre}" & rating_count > 100;
		`
        });
        //Check if request is successful
        try {
            const result = (yield response).data;
            console.log(result);
            games[genre] = parseGame(result);
            rrn.res.json(games[genre]);
        }
        catch (e) {
            return rrn.next(e);
        }
    });
}
exports.genres = genres;
