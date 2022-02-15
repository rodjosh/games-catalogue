import {useState} from "react";
import {Link} from "react-router-dom";

function Title () {
	//onClick: to change page property and show initial games when clicked
	return (<Link to="/">
		<h1 className="cursor-pointer text-center md:text-left text-4xl font-bold">
			Games Catalogue
		</h1>
	</Link>)
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
		slug: 'fighting'
	},{ 
		name: 'Adventures',
		slug: 'adventure'
	},{ 
		name: 'Shooter',
		slug: 'shooter'
	},{ 
		name: 'RPG',
		slug: 'role-playing-rpg'
	},{ 
		name: 'Simulator',
		slug: 'simulator'
	}];

	const items = options.map((option)=>{
		return (<li className={genreClassValue} key={option.name}>
			{/* onClick: To change page property to the clicked option slug */}
			<Link to={'/genre/' + option.slug}>
				<button className="w-full transition ease-in-out py-2 px-4 hover:bg-gray-400 sm:w-auto"> 
					{option.name} 
				</button>
			</Link>
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
			<Link to="/">
				<Title />
			</Link>
			<Search />
		</div>
		<Menu />		
	</nav>)
}
