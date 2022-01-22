//Data validator
import * as validation from "../validation";

//Importing database models
import {dbmodels} from "../database";
const reviewsModel = dbmodels.Review;

//rrn is req, res & next
function checkInput(rrn: validation.RRN) {

	interface Review {
		author: string,
		rate: number,
		description: string,
		game_id: number
	}

	const {author, rate, description, game_id} = rrn.req.body as Review;

	//Validation for wrong types
	validation.wrongType(rrn.req.body, {
		author: "string",
		rate: "number",
		description: "string",
		game_id: "number"
	});

	/*
	Note: empty integers field will fall on wrongtype due to being
	empty got assign "undefined"
	*/

	//Validation for empty values (Only strings)
	validation.empty(author, description);

	//Validation for special chars
	validation.specialChars(author);
}

export async function addReview (rrn: validation.RRN) {
	//Check user input to be valid
	if (validation.asyncError(checkInput, rrn)) return;

	//Saving params
	const {author, rate, description, game_id} = rrn.req.body;

	//Storing the user in the database
	const review = reviewsModel.build({
		author: author,
		rate: rate,
		description: description,
		game_id: game_id
	});

	review.save()

	.then(()=>{
		rrn.res.send("Review successfully added");
	}).catch((e:any)=>{
		rrn.next(e);
	})
}

export async function getReviews (rrn: validation.RRN) {
	//Parsing game id
	const {game_id} = rrn.req.body;

	//Check if game id is valid
	if (validation.asyncError((rrn: validation.RRN)=>{
		validation.wrongType(rrn.req.body, {
			game_id: "number"
		});
	}, rrn)) return;

	//Searching reviews that match the game id
	const reviews = await reviewsModel.findAll({
		where: {
			game_id: game_id
		},
		limit: 10
	})

	//Handling if no reviews
	if (!reviews.length) return rrn.next(new Error('No reviews for this game id'));

	//Returning results in response
	const results = reviews.map((review:any)=>review.dataValues); 
	rrn.res.json(results);
}