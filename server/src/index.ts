import startDatabase from "./database";
import express from "express";

const app = express();
const database = startDatabase();

//Checking database connection
if (!database){
	throw new Error("Cannot connect to the database");
}

//API routes manager
import routes from "./routes";

//API router
const api = express.Router();

//Parsing json body requests
api.use(express.json());

//Handling api requests with routes

api.post('/signup', (req, res, next)=>{
	routes.signup({req, res, next});
})

api.post('/login', (req, res, next)=>{
	routes.login({req, res, next});
})

api.post('/addreview', (req, res, next)=>{
	routes.addReview({req, res, next});
})

api.post('/getreviews', (req, res, next)=>{
	routes.getReviews({req, res, next});
})

const games = express.Router();
api.use('/games', games);

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
app.listen(3000, ()=>{
	console.log('Listening on 3000');
})