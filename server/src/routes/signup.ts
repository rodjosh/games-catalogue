import * as validation from "../validation";

import {dbmodels} from "../database";
const userModel = dbmodels.User;

import * as bcrypt from "bcrypt";

function checkInput(rrn: validation.RRN){

	interface User {
		name: string,
		username: string,
		email: string,
		gender: string,
		age: number,
		password: string
	}

	const {name, age, username, email, gender, password} = rrn.req.body as User;

	validation.wrongType(rrn.req.body, {
		name: "string",
		username: "string",
		email: "string",
		gender: "string",
		age: "number",
		password: "string"
	});

	validation.empty(name, username, email, gender, password);
	validation.hasSpaces(username, email);
	validation.specialChars(name, username, email, gender);
}

export default async function signup (rrn: validation.RRN){
	if (validation.asyncError(checkInput, rrn)) return;

	const {name, username, email, gender, age, password} = rrn.req.body;

	// To encrypt user password
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	// To store the user in the database
	const user = userModel.build({
		name: name,
		username: username,
		email: email,
		gender: gender,
		age: age,
		password: hashedPassword
	});

	user.save()

	.then(()=>{
		rrn.res.send("Succesfully registered");
	}).catch((e:any)=>{
		rrn.next(new Error("User already exists"));
	})
}
