import * as validation from "../validation";

import {dbmodels} from "../database";
const reviewsModel = dbmodels.Review;

function checkInput(rrn: validation.RRN) {

	interface Review {
		author: string,
		rate: number,
		description: string,
		game_id: number
	}

	const {author, rate, description, game_id} = rrn.req.body as Review;

	validation.wrongType(rrn.req.body, {
		author: "string",
		rate: "number",
		description: "string",
		game_id: "number"
	});

	validation.empty(author, description);
	validation.specialChars(author);
}

export async function addReview (rrn: validation.RRN) {
	if (validation.asyncError(checkInput, rrn)) return;

	const {author, rate, description, game_id} = rrn.req.body;

	// To save the review in the database
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
	const game_id:number = rrn.req.body.game_id;
	
	if (typeof game_id !== "number"){
		rrn.next(new Error("Invalid game id"));
		return;
	}

	// To search for reviews that match the game id
	const reviews = await reviewsModel.findAll({
		where: {
			game_id: game_id
		},
		limit: 10
	})

	if (!reviews.length) return rrn.next(new Error('No reviews for this game id'));

	const results = reviews.map((review:any)=>review.dataValues); 
	rrn.res.json(results);
}
