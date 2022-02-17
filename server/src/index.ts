import startDatabase from "./database";
import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

import jwt from "./jwt"

const app = express();
const database = startDatabase();

//To check database connection
if (!database){
	throw new Error("Cannot connect to the database");
}

import routes from "./routes";

//Temporary fix
app.use(cors({origin: true, credentials: true}))
//app.use(cors());

//To parse body data and cookies
app.use(express.json());
app.use(cookieParser());

const api = express.Router();

api.post('/signup', (req, res, next)=>{
	routes.signup({req, res, next});
})

api.post('/login', (req, res, next)=>{
	routes.login({req, res, next});
})

//To prevent non-authenticated users
const usersOnly = express.Router();
api.use(usersOnly);

//To attach jwt checking to users only endpoints
usersOnly.use(jwt.checkJWT);
usersOnly.get('/checklogin', (req, res, next)=>{
	routes.checkLogin({req, res, next});
});

const reviews = express.Router();
usersOnly.use(reviews);

reviews.post('/addreview', (req, res, next)=>{
	routes.addReview({req, res, next});
})

reviews.post('/getreviews', (req, res, next)=>{
	routes.getReviews({req, res, next});
})

const games = express.Router();
usersOnly.use('/games', games);

games.get('/rated', (req, res, next)=>{
	routes.rated({req, res, next});
});

games.get('/genre/:genre', (req, res,next)=>{
	routes.genres({req, res, next}, req.params.genre);
});

app.use('/api', api);

//To handle errors
app.use((err:any, req:any, res:any, next:any)=>{
	const message = "Error: " +  err.message;

	res.status(500);
	res.send(message);

	console.log(message);
})

app.listen(3001, ()=>{
	console.log('Server listening on 3001');
})
