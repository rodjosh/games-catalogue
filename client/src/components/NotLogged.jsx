import {useCallback, useState} from "react";
import {Routes, Route, Link, Navigate} from "react-router-dom";

function Message({children}) {
	return (<h1 className="text-sm my-2">
		{children}
	</h1>)
}

function UpperText({children}) {
	return (<h1 className="my-4 font-black text-slate-700 text-2xl">
		{children}
	</h1>);
}

function UserField(props) {
	return (<input className="w-[70%] border-2 border-slate-300 rounded-xl py-2 px-6 my-4" {...props} />);
}

function SubmitButton({children, onClick}) {
	return (<button onClick={onClick} className="bg-blue-500 py-2 px-12 rounded-xl text-white font-semibold my-4">
		Submit
	</button>);
}

function LinkText({children}) {
	return (<div className="text-sm text-blue-700">
		{children}
	</div>)
}

export default function NotLogged({ setUserToken }) {
	const [userData, setUserData] = useState({});
	const [message, setMessage] = useState(null);

	const submitFn = useCallback(endpoint => {
		try {
			fetch("http://localhost:3001/api/" + endpoint, {
				method: "POST",
				body: JSON.stringify(userData),
				headers: {'Content-Type': 'application/json'},
				credentials: 'include'
			}).then(res => {
				if (res.ok) return res.text().then(data => {
					if (endpoint === "login") {	
						setMessage("Successfully Logged");
						setUserToken(data);
					} else {
						setMessage(data);
					}
				})
				
				res.text().then(text => setMessage(text));
			});

		} catch {
			setMessage("Failed to fetch server");
		}
	}, [userData, setMessage, setUserToken]);

	const handleDataChange = useCallback(e => {
		const property = e.target.getAttribute('name');
		const type = e.target.getAttribute('type');

		const newState = userData;	
		newState[property] = type === "number" ? parseInt(e.target.value) : e.target.value;

		setUserData(newState);
	}, [userData]);
		
	return (<>
		<Routes>
			<Route path="/" element={<Navigate to="/login" replace={true} />} />
			<Route path="/login" element={""} />
			<Route path="/signup" element={""} />
		</Routes>

		<div className="flex flex-col min-h-screen items-center justify-center">
		<div className="flex flex-col items-center w-full my-8 border-2 border-slate-400 rounded-xl lg:w-[400px] py-8">
			<Routes>
				<Route path="/login" element={<UpperText>Log in</UpperText>} />
				<Route path="/signup" element={<UpperText>Sign up</UpperText>} />
			</Routes>

			<UserField onChange={handleDataChange} name="username" type="text" placeholder="Username" />
	
			<Routes>
				<Route path="/login" element={""} />
				<Route path="/signup" element={<>
					<UserField onChange={handleDataChange} name="name" type="text" placeholder="Name" />
					<UserField onChange={handleDataChange} name="email" type="text" placeholder="Email" />
					<UserField onChange={handleDataChange} name="gender" type="text" placeholder="Gender" />
					<UserField onChange={handleDataChange} name="age" type="number" placeholder="Age" />
				</>} />
			</Routes>
	
			<UserField onChange={handleDataChange} name="password" type="password" placeholder="Password" />
			
			<Routes>
				<Route path="/login" element={<>
					<SubmitButton onClick={()=>submitFn('login')} />
					<Link to="/signup">
						<LinkText>Go to signup page</LinkText>
					</Link>
				</>}/>

				<Route path="/signup" element={<>
					<SubmitButton onClick={()=>submitFn('signup')} />
					<Link to="/login">
						<LinkText>Go to login page</LinkText>
					</Link>
				</>}/>
			</Routes>
			
			<Message>{message}</Message>
		</div>
		</div>
	</>)
}
