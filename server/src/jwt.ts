import env from "./env";
import jwt from "jsonwebtoken";
import type {VerifyErrors, JwtPayload} from "jsonwebtoken";
import type {Request, Response, NextFunction} from "express";

const JWT_SECRET = env?.JWT_SECRET;

interface Payload {
	user: string
}

export default {
	checkJWT(req: Request, res: Response, next: NextFunction){
		if (req.cookies.user_token){
			jwt.verify(req.cookies.user_token, JWT_SECRET, (err, decoded)=>{
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
