//Data validator
import * as validation from "../validation";

//To make calls to igdb api
import axios from 'axios';
import {config} from 'dotenv';

//Setting up env file variables
config({
	path: __dirname + '/../../../.env'
});

//Store games lists from api calls
const games:any = {};

//Games API
const games_url = 'https://api.igdb.com/v4/games';

function parseGame(games_list:any){
	//Restructuring every game object
	return games_list.map((game:any)=>{
		return {
			name: game.name,
			cover: game.cover.url,
			genres: game.genres.map((genre:any)=>genre.name),
			summary: game.summary,
			rating: game.total_rating.toFixed(2)
		}
	})
}

async function getToken(){
	//Request token from twitch API
	const response = axios({
		method: 'post',
		url: 'https://id.twitch.tv/oauth2/token',
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`
	});

	//Check if the request is successful
	try {
		const result = await response;
		return result.data.access_token;
	} catch {
		return false;
	}
}

export async function rated(rrn: validation.RRN){
	//Returning previous data if already loaded
	if (games.rated){
		rrn.res.json(games.rated);
		return;
	}

	//Getting api token
	const token = await getToken();

	//Return error if token request fails
	if (!token)	return rrn.next(new Error('Problems creating token'));

	//Requesting API for games
	const response = axios({
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
		games.rated = parseGame((await response).data);
		rrn.res.json(games.rated);
	} catch (e) {
		return rrn.next(e)
	}
}

export async function genres(rrn: validation.RRN, genre: string){
	//Returning previous data if already loaded
	if (games[genre]){
		rrn.res.json(games[genre]);
		return;
	}

	//Getting api token
	const token = await getToken();

	//Return error if token request fails
	if (!token)	return rrn.next(new Error('Problems creating token'));

	//Requesting API for games
	const response = axios({
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
		const result = (await response).data;
		console.log(result)

		games[genre] = parseGame(result);
		rrn.res.json(games[genre]);
	} catch (e) {
		return rrn.next(e)
	}	
}