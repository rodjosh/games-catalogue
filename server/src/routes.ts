import signup from './routes/signup';
import login from './routes/login';
import {addReview, getReviews} from './routes/reviews';
import {rated, genres} from './routes/games';

const routes = {
	signup: signup,
	login: login,
	addReview: addReview,
	getReviews: getReviews,
	rated: rated,
	genres: genres
}

export default routes;