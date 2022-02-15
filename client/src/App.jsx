import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Games from "./components/Games";
import NotLogged from "./components/NotLogged";

async function checkLogin(setLoggedStatus) {
	let res;

	try {
		res = await fetch('http://localhost:3001/api/checklogin');
	} catch {
		console.error("Failed to request server");
		return;
	}

	if (res.ok){
		setLoggedStatus(true);
	} else {
		const text = await res.text();
		console.log(text);

		setLoggedStatus(false);
	}
}

function App() {
	const [loggedStatus, setLoggedStatus] = useState(null);

	const loggedPage = (<>
		<Nav />
		<Routes>
			<Route path="/" element={<Games />} />
			<Route path="/genre/:genre" element={<Games />} />
		</Routes>
		<Footer />
	</>);

	const checkingLoggedStatusPage = (<h1>Checking logged status</h1>);

	useEffect(()=>{
		checkLogin(setLoggedStatus);
	}, []);

	return (<div className="container mx-auto">
		{
			loggedStatus === null ? checkingLoggedStatusPage : 
				loggedStatus === true ? loggedPage : 
					<NotLogged setLoggedStatus={setLoggedStatus} />
		}
	</div>);
}

export default App;
