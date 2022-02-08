import {useState} from 'react';

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Games from "./components/Games";

function App() {

	//To manage page changes
	const [page, setPage] = useState('/');

	//Main page structure
	return (<div className="container mx-auto">
		<Nav setPage={setPage}/>
		<Games page={page} />
		<Footer />
	</div>);
}

export default App;
