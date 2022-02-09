import env from "./env";
import jwt from "jsonwebtoken";
import type {Request, Response, NextFunction} from "express";

const JWT_SECRET = env?.JWT_SECRET;

interface Payload {
	user: string
}

export default {
	checkJWT(req: Request, res: Response, next: NextFunction){
		
	},
	createJWT(payload: Payload){
		return jwt.sign(payload, JWT_SECRET);
	}
}
