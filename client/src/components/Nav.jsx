function Title () {
	return (<h1 className="text-center md:text-left text-4xl font-bold">
		Games Catalogue
	</h1>)
}

function Search () {
	return (<input className="hidden md:block border border-slate-400 rounded-md px-2 py-1" type="text" placeholder="Search here" />)
}

function Menu (props) {
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
		return (<li className="inline-block" key={option.name}>
			<button className="py-2 px-4 hover:bg-gray-400" onClick={()=>{
				props.setPage(option.slug); 
				console.log(option.slug);
			}}> {option.name} </button>
		</li>)
	})

	return (<ul className="flex flex-row bg-gray-300">
		{items}
	</ul>)
}

export default function Nav (props) {
	return (<nav>
		<div className="md:flex md:flex-row md:justify-between p-8">
			<Title />
			<Search />
		</div>
		<Menu setPage={props.setPage} />		
	</nav>)
}
