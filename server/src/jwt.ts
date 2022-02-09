import env from "./env";
import jwt from "jsonwebtoken";
import types {Request, Response, NextFunction} from "express";

const JWT_SECRET = env?.JWT_SECRET;

export default {
	checkJWT(req: Request, res: Response, next: NextFunction){
		
	},
	createJWT(){
	}
}
