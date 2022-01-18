//Data validator
import * as validation from "../validation";

//Importing database models
import {dbmodels} from "../database";
const userModel = dbmodels.User;

//Password encrypter
import * as bcrypt from "bcrypt";

//rrn is req, res & next
function checkInput(rrn: any){

	interface User {
		username: string,
		password: string
	}

	const {username, password} = rrn.req.body as User;

	//Validation for wrong types
	validation.wrongType(rrn.req.body, {
		username: "string",
		password: "string"
	});

	//Validation for empty values
	validation.empty(username, password);

	//Validation for spaces
	validation.hasSpaces(username);

	//Validation for special chars
	validation.specialChars(username);
}

export default async function signup (rrn: any){
	//Check user input to be valid
	checkInput(rrn);

	//Saving params
	const {username, password} = rrn.req.body;

	//Retrieven users that matchs username
	const user = await userModel.findOne({
		where: {
			username: username
		}
	});

	//If no users then username doesn't exists
	if (!user) return rrn.next(new Error("User doesn't exist"));

	//Comparing passwords
	const hashedPassword:string = user.get('password') as string;
	const result = await bcrypt.compare(password, hashedPassword);

	//If passwords match then send success message
	if (result) {
		return rrn.res.send('Successfully logged');
	}

	//If passwords doesn't match then send error message
	rrn.next(new Error('Password doesn\'t match'));
}