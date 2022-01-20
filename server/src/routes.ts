import signup from './routes/signup';
import login from './routes/login';
import {addReview, getReviews} from './routes/reviews';

const routes = {
	signup: signup,
	login: login,
	addReview: addReview,
	getReviews: getReviews
}

export default routes;