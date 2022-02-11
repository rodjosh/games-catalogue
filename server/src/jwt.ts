import env from "./env";
import * as jwt from "jsonwebtoken";
import type {Request, Response, NextFunction} from "express";

const JWT_SECRET = env?.JWT_SECRET as string;

interface Payload {
	user: string
}

export default {
	checkJWT(req: Request, res: Response, next: NextFunction){
		const token = req.cookies.user_token as string

		if (token){
			jwt.verify(token, JWT_SECRET, (err, decoded)=>{
				if (err) throw new Error("Invalid token");

				const payload = decoded as Payload;
				res.locals.username = payload.user;
				next();
			})
			
		} else {
			throw new Error("Not authorized to view this content");
		}
		
	},
	createJWT(payload: Payload){
		return jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
	}
}
