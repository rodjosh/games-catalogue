//Empty values validator
export function empty(...values:any[]):void {

	values.forEach(value=>{
		//If value.length is falsy throw error
		if (!value.length) throw new Error('Empty or invalid field');
	});
}

export function hasSpaces(...values:any[]): void{
	const whitespacesRegex:RegExp = /\s/;

	values.forEach(value=>{

		//If the regex match some spaces throws an error
		if (whitespacesRegex.test(value)) throw new Error('Field has spaces');
	})
}

export function specialChars(...values:any[]):void {
	const specialcharsRegex:RegExp = /[^a-z0-9 \-_@\.]/i;

	values.forEach(value=>{

		//If the regex match some spaces throws an error
		if (specialcharsRegex.test(value)) throw new Error('Field has special chars');
	})
}

//Wrong type values validator
export function wrongType (data: any, types: {[index: string]: string}){

	//Retrieving properties
	const dataKeys = Object.keys(data);
	const typeKeys = Object.keys(types);

	//Checking if data has all types items
	if (typeKeys.length > dataKeys.length){
		return false;
	}

	//Checking if they have equal values
	const result = dataKeys.every(key => typeof data[key] == types[key]);

	if(!result) throw new Error('Wrong input types');
}  