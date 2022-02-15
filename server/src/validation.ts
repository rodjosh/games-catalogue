import type {Request, Response, NextFunction} from "express";

type empty_value = string | Array<any>

export interface RRN {
	req: Request;
	res: Response;
	next: NextFunction;
}

export function empty(...values:Array<empty_value>):void {
	values.forEach(value=>{
		if (!value.length) throw new Error('Empty or invalid field');
	});
}

export function hasSpaces(...values:Array<string>): void {
	const whitespacesRegex:RegExp = /\s/;

	values.forEach(value=>{
		if (whitespacesRegex.test(value)) throw new Error('Field has spaces');
	})
}

export function specialChars(...values:Array<string>):void {
	const specialcharsRegex:RegExp = /[^a-z0-9 \-_@\.]/i;

	values.forEach(value=>{
		if (specialcharsRegex.test(value)) throw new Error('Field has special chars');
	})
}

export function wrongType (data: any, types: {[index: string]: string}): void {
	// To compare by properties
	const dataKeys = Object.keys(data);
	const typeKeys = Object.keys(types);

	if (typeKeys.length > dataKeys.length){
		throw new Error('Missing fields')
	}

	// To check if they have equal types
	const result = typeKeys.every(key => typeof data[key] == types[key]);
	if(!result) throw new Error('Wrong input types');
}

// To catch async errors and send them within the next function of the middlewares chain
export function asyncError (inputChecker: any, rrn: RRN): boolean {
	try {
		inputChecker(rrn);
		return false;
	} catch (e) {
		rrn.next(e);
		return true;
	}
}
