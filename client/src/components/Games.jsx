import React, {useState, useEffect} from "react";

//Fallback for games section
function loadingGames(){
	return (<h1>Loading Games</h1>);
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

		return (<div className="py-8 px-12 text-gray-800 hover:bg-gray-300 cursor-pointer transition ease-in-out flex flex-col sm:p-2 xl:justify-center" key={game.name}>
			<h1 className="font-semibold text-xl text-center px-12 py-2 sm:text-base xl:px-4">{game.name}</h1>

			<div className="xl:flex xl:flex-row px-4 pb-2">
				<img alt="Game Cover" className="my-2 w-full xl:mx-auto xl:w-auto xl:h-[200px]" src={game.cover} />
				<p className="text-justify text-lg pt-4 break-words sm:leading-5 sm:text-base xl:px-4 xl:py-2 xl:text-[14px]">{game.summary}</p>
			</div>
		</div>)
	})
}

//To fetch games data from API
function fetchGames(page, setGameData){
	let url = 'http://localhost:3001/api/games/rated';

	if (page !== '/'){
		url = 'http://localhost:3001/api/games/genre' + page;
	} else {
		url = 'http://localhost:3001/api/games/rated';
	}

	fetch(url)
	.then((res)=>res.json())
	.then((data)=>{
		setGameData(data);
	});
}

export default function Games(props){
	//To render whenever games data changes
	const [gameData, setGameData] = useState(null);	

	//To fetch and change game data whenever page property changes
	useEffect(()=>{
		setGameData(null);
		fetchGames(props.page, setGameData);
		console.log("Loaded");
	}, [props.page])

	return (<main className="grid sm:grid-cols-2 lg:grid-cols-3 mt-8">
		{/* To show the fallback when games data isn't ready */}
		{gameData ? parseGames(gameData) : loadingGames() }
	</main>);
}
