import * as validation from "../validation";
import axios from 'axios';
import env from '../env';

type GameGenre = {
	name: string
}

type GameCover = {
	url: string
}

interface Game {
	name: string;
	cover: GameCover;
	genres: Array<GameGenre>;
	summary: string;
	total_rating: number;
}

//To storage previous API calls
const games:any = {};
const games_url = 'https://api.igdb.com/v4/games';

//To send a structured version of games information
function parseGame(games_list:Array<Game>){
	return games_list.map((game:Game)=>{
		return {
			name: game.name,
			cover: game.cover.url,
			genres: game.genres.map((genre:any)=>genre.name),
			summary: game.summary,
			rating: game.total_rating.toFixed(2)
		}
	})
}

//To get Twitch API token
async function getToken(){
	const response = axios({
		method: 'post',
		url: 'https://id.twitch.tv/oauth2/token',
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: `client_id=${env?.CLIENT_ID}&client_secret=${env?.CLIENT_SECRET}&grant_type=client_credentials`
	});

	try {
		const result = await response;
		return result.data.access_token;
	} catch (e) {
		return false;
	}
}

export async function rated(rrn: validation.RRN){
	if (games.rated){
		rrn.res.json(games.rated);
		return;
	}

	const token = await getToken();
	if (!token) return rrn.next(new Error('Problems creating token'));

	// To fetch games data from igdb API
	const response = axios({
		method: 'post',
		url: games_url,
		headers: {
			'Content-Type': 'text/plain',
			'Client-ID': `${env?.CLIENT_ID}`,
			'Authorization': `Bearer ${token}`
		},
		data: `
			fields name, cover.url, genres.name, total_rating, summary;
			where total_rating_count > 1000;
			sort total_rating_count desc;
			sort total_rating desc;
		`
	});

	try {
		games.rated = parseGame((await response).data);
		rrn.res.json(games.rated);
	} catch (e) {
		return rrn.next(e)
	}
}

export async function genres(rrn: validation.RRN, genre: string){
	if (games[genre]){
		rrn.res.json(games[genre]);
		return;
	}

	const token = await getToken();
	if (!token)	return rrn.next(new Error('Problems creating token'));

	//To fetch genres list from igdb API
	const response = axios({
		method: 'post',
		url: games_url,
		headers: {
			'Content-Type': 'text/plain',
			'Client-ID': `${env?.CLIENT_ID}`,
			'Authorization': `Bearer ${token}`
		},
		data: `
			fields name, cover.url, genres.name, total_rating, summary;
			where genres.slug = "${genre}" & rating_count > 100;
		`
	});

	try {
		const result = (await response).data;
		console.log(result)

		games[genre] = parseGame(result);
		rrn.res.json(games[genre]);
	} catch (e) {
		return rrn.next(e)
	}	
}
