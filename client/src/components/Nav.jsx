import {useState} from "react";

function Title (props) {
	//onClick: to change page property and show initial games when clicked
	return (<h1 onClick={()=>props.setPage('/')} className="cursor-pointer text-center md:text-left text-4xl font-bold">
		Games Catalogue
	</h1>)
}

function Search () {
	return (<input className="hidden md:block border border-slate-400 rounded-md px-2 py-1" type="text" placeholder="Search here" />)
}

function Menu (props) {
	//To manage state of dropdown menu in mobile
	const [[showGenres, nextClick], setShowGenres] = useState([false, true]);
	const genreClassValue = showGenres ? 'block sm:inline-block' : 'hidden sm:inline-block';

	//To list menu options and their genre slug for API purposes
	const options = [{
		name: 'Fighting',
		slug: '/fighting'
	},{ 
		name: 'Adventures',
		slug: '/adventure'
	},{ 
		name: 'Shooter',
		slug: '/shooter'
	},{ 
		name: 'RPG',
		slug: '/role-playing-rpg'
	},{ 
		name: 'Simulator',
		slug: '/simulator'
	}];

	const items = options.map((option)=>{
		return (<li className={genreClassValue} key={option.name}>
			{/* onClick: To change page property to the clicked option slug */}
			<button className="w-full transition ease-in-out py-2 px-4 hover:bg-gray-400 sm:w-auto" onClick={()=>{
				props.setPage(option.slug); 
				console.log(option.slug);
			}}> {option.name} </button>
		</li>)
	})

	return (<ul className="flex flex-col sm:flex-row bg-gray-300">
		{/* To show a dropdown menu when screen gets small */}
		<li className="block sm:hidden" key="dropdown-menu" onClick={()=>setShowGenres([nextClick, showGenres])}>
			<button className="w-full transition ease-in-out py-2 px-4 hover:bg-gray-400 sm:w-auto"> Show Genres </button>
		</li>
		{items}
	</ul>)
}

export default function Nav (props) {
	return (<nav>
		{/* Upper part of the navbar */}
		<div className="md:flex md:flex-row md:justify-between p-8">
			<Title setPage={props.setPage}/>
			<Search />
		</div>
		<Menu setPage={props.setPage} />		
	</nav>)
}
