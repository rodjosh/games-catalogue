import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom"; 

import {userToken} from "../App.jsx";

//Fallback for games section
function loadingGames(){
	return (<h1>Loading Games</h1>);
}

function Game({children, ...props}){
	return (<div 
		className="py-8 px-12 text-gray-800 hover:bg-gray-300 cursor-pointer transition ease-in-out flex flex-col sm:p-2 xl:justify-center" 
		{...props}>
			{children}
	</div>);
}

function GameTitle({children}){
	return (<h1 className="font-semibold text-xl text-center px-12 py-2 sm:text-base xl:px-4">
		{children}
	</h1>)
}

function GameInfo({children}){
	return (<div className="xl:flex xl:flex-row px-4 pb-2">{children}</div>);
}

function GameCover(props){
	return (<img alt="Game Cover" className="my-2 w-full xl:mx-auto xl:w-auto xl:h-[200px]" {...props} />);
}

function GameSummary({children}){
	return (<p className="text-justify text-lg pt-4 break-words sm:leading-5 sm:text-base xl:px-4 xl:py-2 xl:text-[14px]">
		{children}
	</p>);
}

//To convert json data to react components
function parseGames(gameData){
	return gameData.map(game => {
		game.cover = game.cover.replace("t_thumb", "t_cover_big");
	
		//To create a summary extract
		const summary_chars = game.summary.split("");
		if (summary_chars.length > 200) {
			game.summary = summary_chars.slice(0, 200);
			game.summary = game.summary.join("") + "...";
		}

		return (<Game key={game.name}>
			<GameTitle>{game.name}</GameTitle>
			<GameInfo>
				<GameCover src={game.cover} />
				<GameSummary> {game.summary} </GameSummary> 
			</GameInfo>
		</Game>);
	})
}

export default function Games(){
	//To render whenever games data changes
	const [gameData, setGameData] = useState(null);	
	const {genre} = useParams();

	const user_token = useContext(userToken);

	//To fetch and change game data whenever page property changes
	useEffect(()=>{
		setGameData(null);
		console.log(user_token)		

		const url = genre ? 'http://localhost:3001/api/games/genre/' + genre :
					'http://localhost:3001/api/games/rated';
		
		fetch(url, {
			headers: {'Cookie': "user_token=" + user_token},
			credentials: 'include'
		}).then(res => {
			if (res.ok) return res.json();
			throw res.text();
		}).then(data => {
			setGameData(data);
		}).catch(err => err.then(text => console.log(text)));
	}, [genre, user_token])

	return (<main className="grid sm:grid-cols-2 lg:grid-cols-3 mt-8">
		{/* To show the fallback when games data isn't ready */}
		{gameData ? parseGames(gameData) : loadingGames() }
	</main>);
}
