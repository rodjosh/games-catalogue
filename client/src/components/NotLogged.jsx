import {useCallback, useState} from "react";
import {Routes, Route} from "react-router-dom";

function UpperText({children}){
	return (<h1 className="my-4 font-black text-slate-700 text-2xl">
		{children}
	</h1>);
}

function UserField(props){
	return (<input className="w-[70%] border-2 border-slate-300 rounded-xl py-2 px-6 my-4" {...props} />);
}

function SubmitButton({children, onClick}){
	return (<button onClick={onClick} className="bg-blue-500 py-2 px-12 rounded-xl text-white font-semibold my-4">
		Submit
	</button>);
}

export default function NotLogged({ setLoggedState }) {
	const [userData, setUserData] = useState({});

	const submitFn = useCallback(endpoint => {
		try {
			fetch("http://localhost:3001/api/" + endpoint, {
				method: "POST",
				body: JSON.stringify(userData),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				if (res.ok) return res.text().then(data => {
					console.log(data);
				})
				
				res.text().then(text => {
					console.error(text);
				})
			});

		} catch {
			console.error("Failed to fetch server");
		}
	}, [userData]);

	const handleDataChange = useCallback(e => {
		const property = e.target.getAttribute('name');
		const type = e.target.getAttribute('type');

		const newState = userData;	
		newState[property] = type === "number" ? parseInt(e.target.value) : e.target.value;

		setUserData(newState);
	}, [userData]);
		
	return (<div className="flex flex-col min-h-screen items-center justify-center">
		<div className="flex flex-col items-center w-full my-8 border-2 border-slate-400 rounded-xl lg:w-[400px] py-8">
			<Routes>
				<Route path="/" element={<UpperText>Log in</UpperText>} />
				<Route path="/signup" element={<UpperText>Sign up</UpperText>} />
			</Routes>

			<UserField onChange={handleDataChange} name="username" type="text" placeholder="Username" />
	
			<Routes>
				<Route path="/" element={""} />
				<Route path="/signup" element={<>
					<UserField onChange={handleDataChange} name="name" type="text" placeholder="Name" />
					<UserField onChange={handleDataChange} name="email" type="text" placeholder="Email" />
					<UserField onChange={handleDataChange} name="gender" type="text" placeholder="Gender" />
					<UserField onChange={handleDataChange} name="age" type="number" placeholder="Age" />
				</>} />
			</Routes>
	
			<UserField onChange={handleDataChange} name="password" type="password" placeholder="Password" />
			
			<Routes>
				<Route path="/" element={
					<SubmitButton onClick={()=>submitFn('login')} />
				}/>

				<Route path="/signup" element={
					<SubmitButton onClick={()=>submitFn('signup')} />
				}/>
			</Routes>
		</div>
	</div>)
}
