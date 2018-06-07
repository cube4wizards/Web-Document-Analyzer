//I need:
//Lower case/remove special characters.
//Take string, return object with words.
//Uh... hm. 

function format(string){
	if(typeof string != 'string')
		throw "Format function in parser.js was passed an object that wasn't a string.";
	string = string.toLowerCase();
	return string.replace(/[^a-z0-9 ]/g, "");
}

function splice(string){
	if(typeof string != 'string')
		throw "Splice function in parser.js was passed something other than a string."
	console.log(string);
	string = format(string);
	console.log(string);
	string = string.split(" ");
	console.log(string);
	return arrayToObj(string.sort());
}

function lettersplice(string){
	if(typeof string != 'string')
		throw "Letter splice function in parser.js was passed something other than a string."
	string = format(string);
	string = string.replace(/\s/g, '');
	string = string.split(""); //Splits on nothing splits between each letter.
	return arrayToObj(string.sort());
}

function arrayToObj(array){
	//Not sure how to type check this.
	let obj = {};
	let i;
	for(i = 0; i < array.length; i++){
		if(array[i] in obj)
			obj[array[i]] == obj[array[i]]++;
		else
			obj[array[i]] = 1;
	}
	
	obj._total = i;
	
	return obj;
}

module.exports = {
		splice: splice,
		lettersplice: lettersplice
}