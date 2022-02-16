import {useState, useMemo} from "react";
import {Link} from "react-router-dom";

function TextTitle({children}) {
	return (<h1 className="cursor-pointer text-center md:text-left text-4xl font-bold">
		{children}
	</h1>)
}

function Title({children}) {
	return (<Link to="/">
		<TextTitle>
			{children}
		</TextTitle>
	</Link>)
}

function SearchBar() {
	return (<input className="hidden md:block border border-slate-400 rounded-md px-2 py-1" 
		type="text" placeholder="Search here" />);
}

function MenuButton({children}){
	return (<div className="w-full transition ease-in-out py-2 px-4 hover:bg-gray-400 sm:w-auto"> 
		{children}
	</div>);
}

function MenuItem({children, ...props}){
	return (<li {...props}>
		{children}
	</li>);
}

function DropdownButton({children, ...props}) {
	return (<li className="block sm:hidden" {...props}>
			<button className="w-full transition ease-in-out py-2 px-4 hover:bg-gray-400 sm:w-auto">
				{children} 
			</button>
		</li>);
}

function Menu({options}) {
	//To manage state of dropdown menu in mobile
	const [showDropdown, switchMenu] = useState(false)
	
	const genreClass = useMemo(()=>{
		return showDropdown ? 'block sm:inline-block' : 'hidden sm:inline-block';
	}, [showDropdown]);

	const items = [];

	for (const genre in options){
		const slug = options[genre];

		const button = (<Link to={'/genre/' + slug}>
			<MenuButton> {genre} </MenuButton>
		</Link>);

		items.push(<MenuItem className={genreClass} key={genre}>
			{button}
		</MenuItem>)
	}

	return (<ul className="flex flex-col sm:flex-row bg-gray-300">
		<DropdownButton onClick={()=>switchMenu(!showDropdown)}>
			Show Genres
		</DropdownButton>

		{items}
	</ul>);
}

function UpperNav({children}){
	return (<div className="md:flex md:flex-row md:justify-between p-8">
		{children}
	</div>)
}

const options = {
	Fighting: 'fighting',
	Adventures: 'adventure',
	Shooter: 'shooter',
	RPG: 'role-playing-rpg',
	Simulator: 'simulator'
}

export default function Nav (props) {
	return (<nav>
		<UpperNav>
			<Title> Games Catalogue </Title>
			<SearchBar/>
		</UpperNav>

		<Menu options={options}/>		
	</nav>)
}
