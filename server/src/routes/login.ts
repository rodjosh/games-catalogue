import * as validation from "../validation";
import * as bcrypt from "bcrypt";
import jwt from "../jwt";

import {dbmodels} from "../database";
const userModel = dbmodels.User;

function getUserFromBody(rrn: validation.RRN){
	const username: string = rrn.req.body.username;
	const password: string = rrn.req.body.password;

	return {username, password};
}

function checkInput(rrn: validation.RRN){
	const user = getUserFromBody(rrn);

	validation.wrongType(rrn.req.body, {
		username: "string",
		password: "string"
	});

	validation.empty(user.username, user.password);
	validation.hasSpaces(user.username);
	validation.specialChars(user.username);
}

export default async function login (rrn: validation.RRN){
	//To check if input match with predefined scheme and types
	if (validation.asyncError(checkInput, rrn)) return;

	const {username, password} = rrn.req.body;

	//To retrieve user information if exists in the database
	const user = await userModel.findOne({
		where: {
			username: username
		}
	});

	if (!user) return rrn.next(new Error("User doesn't exist"));

	// To compare passwords
	const hashedPassword:string = user.get('password') as string;
	const result = await bcrypt.compare(password, hashedPassword);

	if (result) {
		const jwt_token = jwt.createJWT({user: username});
		console.log(jwt_token);

		return rrn.res.send('Successfully logged');
	}

	rrn.next(new Error('Password doesn\'t match'));
}
