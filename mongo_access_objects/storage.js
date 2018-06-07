const db = require("./users.js");
const uuid = require("uuid");
const parsing = require("../util/parser.js");

function addData(user, title, document){
	
	//This is the letter breakdown, just as it sounds.
	let letters = parsing.lettersplice(document);
	letters._id = uuid();
	
	//This is actually the WORD breakdown, not the document header.
	document = parsing.splice(document);
	document._id = uuid();
	
	//This is the document header, and should be saved as such.
	let header = new Object();
	header._id = uuid();
	header._title = title;
	header._words = document._id;
	header._letters = letters._id;
	
	//Gotta add the new document to the user data.
	//console.log(user._documents);
	//console.log(typeof user._documents);
	if(typeof user._documents == 'undefined')
		user._documents = [];
	user._documents.push(header._id);
	
	//Now that all that's straight, send it all to the DB.
	db.addDoc(header);
	db.addWords(document);
	db.addLetters(letters);
	db.updateUser(user);
	//console.log(user);
	//console.log(header);
	//console.log(document);
	//console.log(letters);
}

async function findData(id){
	document =await db.findDoc(id).catch(error);
	//Expect errors.
	words = await db.findWords(document._words).catch(error);
	letters = await db.findLetters(document._letters).catch(error);
	
	let ret = new Object();
	ret.header = document;
	ret.words = words;
	ret.letters = letters;
	return ret;
}

async function findUser(username){
	return db.findUser(username);
}

module.exports = {
		addData: addData,
		findData: findData,
		findUser: findUser
}

function error(e){
	console.log(e);
}