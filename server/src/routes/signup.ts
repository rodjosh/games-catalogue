//Data validator
import * as validation from "../validation";

//Importing database models
import {dbmodels} from "../database";
const userModel = dbmodels.User;

//rrn is req, res & next
function checkInput(rrn: any){

	interface User {
		name: string,
		username: string,
		email: string,
		gender: string,
		age: number,
		password: string
	}

	const {name, age, username, email, gender, password} = rrn.req.body as User;

	//Validation for wrong types
	validation.wrongType(rrn.req.body, {
		name: "string",
		username: "string",
		email: "string",
		gender: "string",
		age: "number",
		password: "string"
	});

	/*
	Note: empty integers field will fall on wrongtype due to being
	empty got assign "undefined"
	*/

	//Validation for empty values
	validation.empty(name, username, email, gender, password);

	//Validation for spaces
	validation.hasSpaces(username, email);

	//Validation for special chars
	validation.specialChars(name, username, email, gender);
}

export default async function signup (rrn: any){
	//Check user input to be valid
	checkInput(rrn);

	//Saving params
	const {name, username, email, gender, age, password} = rrn.req.body;

	//Storing the user in the database
	const user = userModel.build({
		name: name,
		username: username,
		email: email,
		gender: gender,
		age: age,
		password: password
	});

	user.save()

	.then(()=>{
		rrn.res.send("Succesfully registered");
	}).catch((e:any)=>{
		rrn.next(e);
	})
}