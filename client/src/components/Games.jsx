import React, {useState, useEffect} from "react";

function loadingGames(){
	return (<h1>Loading Games</h1>);
}

function parseGames(gameData){
	return gameData.map(game => {
		game.cover = game.cover.replace("t_thumb", "t_cover_big");
	
		const summary_chars = game.summary.split("");
		if (summary_chars.length > 200) {
			game.summary = summary_chars.slice(0, 200);
			game.summary = game.summary.join("") + "...";
		}

		return (<div className="p-2 text-gray-800" key={game.name}>
			<h1 className="font-semibold text-lg text-center py-4">{game.name}</h1>

			<div className="xl:flex xl:flex-row">
				<img alt="Game Cover" className="my-2 mx-auto md:h-[300px]  xl:h-[200px]" src={game.cover} />
				<p className="px-8 md:px-12 pt-4 md:text-justify xl:text-left xl:pl-4 xl:py-2 text-[15px] break-words">{game.summary}</p>
			</div>
		</div>)
	})
}

function fetchGames(page, setGameData){
	let url = 'http://localhost:3001/api/games/rated';

	if (page != '/'){
		url = 'http://localhost:3001/api/games/genre' + page;
	}

	fetch(url)
	.then((res)=>res.json())
	.then((data)=>{
		setGameData(data);
	});
}

export default function Games(props){
	const [gameData, setGameData] = useState(null);	

	useEffect(()=>{
		fetchGames(props.page, setGameData);
		console.log("Loaded");
	}, [props.page])

	return (<main className="grid sm:grid-cols-2 lg:grid-cols-3 mt-4">
		{gameData ? parseGames(gameData) : loadingGames() }
	</main>);
}
