import startDatabase from "./database";
import express from "express";

import cookieParser from "cookie-parser";
import jwt from "./jwt"
import cors from "cors";

const app = express();
const database = startDatabase();

//Checking database connection
if (!database){
	throw new Error("Cannot connect to the database");
}

//API routes manager
import routes from "./routes";

//Enable server utilities
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//API router
const api = express.Router();

api.post('/signup', (req, res, next)=>{
	routes.signup({req, res, next});
})

api.post('/login', (req, res, next)=>{
	routes.login({req, res, next});
})

//Prevent not authenticated users
const usersOnly = express.Router();
//usersOnly.use(jwt)
api.use(usersOnly);

//Reviews endpoints
const reviews = express.Router();
usersOnly.use(reviews);

reviews.post('/addreview', (req, res, next)=>{
	routes.addReview({req, res, next});
})

reviews.post('/getreviews', (req, res, next)=>{
	routes.getReviews({req, res, next});
})

//Games endpoints
const games = express.Router();
usersOnly.use('/games', games);

games.get('/rated', (req, res, next)=>{
	routes.rated({req, res, next});
});

games.get('/genre/:genre', (req, res,next)=>{
	routes.genres({req, res, next}, req.params.genre);
});

//Implementing routing
app.use('/api', api);

//Error handling
app.use((err:any, req:any, res:any, next:any)=>{
	const message = "Error: " +  err.message;

	res.status(500);
	res.send(message);

	console.log(message);
})

//Starting up the server
app.listen(3001, ()=>{
	console.log('Listening on 3001');
})
