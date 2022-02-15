import {useState, createContext} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Games from "./components/Games";
import NotLogged from "./components/NotLogged";

export const userToken = createContext(null);

function App() {
	const [user_token, setUserToken] = useState(null);
	
	const loggedPage = (<userToken.Provider value={user_token}>
		<Nav />
		<Routes>
			<Route path="/" element={<Games />} />
			<Route path="/genre/:genre" element={<Games />} />
			<Route path="*" element={<Navigate to="/" replace={true} />} />
		</Routes>
		<Footer />
	</userToken.Provider>);

	return (<div className="container mx-auto">
		{
			user_token !== null ? loggedPage : 
					<NotLogged setUserToken={setUserToken} />
		}
	</div>);
}

export default App;
