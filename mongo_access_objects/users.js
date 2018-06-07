const mongodb = require('mongodb');

/*
 * I need dbs for:
 * users
 * documents
 * words
 * letters
 * 
 * This file will also likely end up being renamed. Oh well.
 * 
 * HASHES will be handled on upper levels. I'm not doing that shit here.
 * Same with xss functions. This is the DB connector. THat's ALL.
 */

//DB pointers. 'db' is the database main connection. The other four are the collections.
var db = undefined;

var usersdb = undefined;
var documentsdb = undefined;
var wordsdb = undefined;
var lettersdb = undefined;

//Connection checkers. All of this is the code to make sure
//the connections are actually there.

async function dbconn(){
	let url = 'mongodb://localhost:27017/textparser';
	//console.log("It's right here, no?");
	db = await new mongodb.MongoClient.connect(url).catch(error);
	
}

async function check(){
	//console.log("Checking DB");
	if(typeof db == 'undefined')
		await dbconn().catch(error);
	//console.log("Checking users");
	if(typeof usersdb == 'undefined'){
		//console.log(db);
		usersdb = await db.collection('users');
	}
	if(typeof documentsdb == 'undefined')
		documentsdb = await db.collection('documents');
	if(typeof wordsdb == 'undefined')
		wordsdb = await db.collection('words');
	if(typeof lettersdb == 'undefined')
		lettersdb = await db.collection('letters');
}

//***********************************************************************************
//User functions.

async function addUser(user){
	await check().catch(error);
	if(typeof user != 'object')
		throw "addUser function was passed " + typeof user + " instead of an object.";
	await usersdb.insert(user).catch(error);
}

async function findUser(username){
	//console.log("Can I even see this?");
	await check().catch(error);
	//console.log("Check completed");
	//console.log(db);
	//console.log(usersdb);
	if(typeof username != 'string')
		throw "Find function was passed " + typeof username + " instead of a string.";
	let user = await usersdb.findOne({_username: username}).catch(error);
	if(typeof user != 'object'){
		console.log("User not found in users.js. Leaving upper management to handle the null.")
		return null;
	}
	//console.log('returning user');
	//console.log(user);
	return user;
}
	
async function getAllUsers(){
	await check().catch(error);
	let user = await usersdb.find().toArray().catch(error);
	if(typeof user != 'object')
		throw "No user objects in database";
	return user;
}

async function removeAllUsers(){
	await check().catch(error);
	await usersdb.remove().catch(error);
}

async function updateUser(user){
	if(typeof user != 'object')
		throw "updateUser function was passed " + typeof user + " instead of an object.";
	await check().catch(error);
	usersdb.update({_username: user._username}, user);
}

async function testUsers(){
	let me = new Object();
	me._username = "cube";
	me._password = "sr388";
	await addUser(me).catch(error);
	let notme = await findUser(me._username).catch(error);
	console.log(notme);
	notme.documents = ['uuid1', 'uuid2'];
	updateUser(notme);
	console.log(await findUser(notme._username).catch(error));
	await removeAllUsers().catch(error);
	console.log(await getAllUsers().catch(error));
}

//***********************************************************************************
//Document functions.

async function addDoc(document){
	await check().catch(error);
	if(typeof document != 'object')
		throw "addDoc function was passed " + typeof document + " instead of an object.";
	await documentsdb.insert(document).catch(error);
}

async function findDoc(id){
	await check().catch(error);
	if(typeof id != 'string')
		throw "Find document function was passed " + typeof id + " instead of a string.";
	let document = await documentsdb.findOne({_id: id}).catch(error);
	if(typeof document != 'object'){
		console.log("Document not found in users.js. Leaving upper management to handle the null.")
		return null;
	}
	return document;
}
	
async function getAllDocs(){
	await check().catch(error);
	let document = await documentsdb.find().toArray().catch(error);
	if(typeof document != 'object')
		throw "No user objects in database";
	return document;
}

async function removeAllDocs(){
	await check().catch(error);
	await documentsdb.remove().catch(error);
}

async function testDocs(){
	let me = new Object();
	me._id = "uuidstringgoeshere"
	await addDoc(me).catch(error);
	let notme = await findDoc(me._id).catch(error);
	console.log(notme);
	await removeAllDocs().catch(error);
	console.log(await getAllDocs().catch(error));
	console.log("Document test complete.");
}

//***********************************************************************************
//Word file functions.

async function addWords(document){
	await check().catch(error);
	if(typeof document != 'object')
		throw "addWords function was passed " + typeof document + " instead of an object.";
	await wordsdb.insert(document).catch(error);
}

async function findWords(id){
	await check().catch(error);
	if(typeof id != 'string')
		throw "Find Words function was passed " + typeof id + " instead of a string.";
	let document = await wordsdb.findOne({_id: id}).catch(error);
	if(typeof document != 'object'){
		console.log("Document not found in users.js. Leaving upper management to handle the null.")
		return null;
	}
	return document;
}
	
async function getAllWords(){
	await check().catch(error);
	let document = await wordsdb.find().toArray().catch(error);
	if(typeof document != 'object')
		throw "No user objects in database";
	return document;
}

async function removeAllWords(){
	await check().catch(error);
	await wordsdb.remove().catch(error);
}

async function testWords(){
	let me = new Object();
	me._id = "uuidstringgoeshere"
	await addWords(me).catch(error);
	let notme = await findWords(me._id).catch(error);
	console.log(notme);
	await removeAllWords().catch(error);
	console.log(await getAllWords().catch(error));
	console.log("Word test complete");
}

//***********************************************************************************
//Letter file functions.

async function addLetters(document){
	await check().catch(error);
	if(typeof document != 'object')
		throw "addLetters function was passed " + typeof document + " instead of an object.";
	await lettersdb.insert(document).catch(error);
}

async function findLetters(id){
	await check().catch(error);
	if(typeof id != 'string')
		throw "Find letters function was passed " + typeof id + " instead of a string.";
	let document = await lettersdb.findOne({_id: id}).catch(error);
	if(typeof document != 'object'){
		console.log("Document not found in users.js. Leaving upper management to handle the null.")
		return null;
	}
	return document;
}
	
async function getAllLetters(){
	await check().catch(error);
	let document = await lettersdb.find().toArray().catch(error);
	if(typeof document != 'object')
		throw "No user objects in database";
	return document;
}

async function removeAllLetters(){
	await check().catch(error);
	await lettersdb.remove().catch(error);
}

async function testLetters(){
	let me = new Object();
	me._id = "uuidstringgoeshere"
	await addLetters(me).catch(error);
	let notme = await findLetters(me._id).catch(error);
	console.log(notme);
	await removeAllLetters().catch(error);
	console.log(await getAllLetters().catch(error));
	console.log("Letter test complete");
}

//***********************************************************************************
//Exports and utility stuff.

module.exports = {
		addUser: addUser,
		findUser: findUser,
		getAllUsers: getAllUsers,
		removeAllUsers: removeAllUsers,
		updateUser: updateUser,
		testUsers: testUsers,
		addDoc: addDoc,
		findDoc: findDoc,
		removeAllDocs: removeAllDocs,
		testDocs: testDocs,
		addWords: addWords,
		findWords: findWords,
		removeAllWords: removeAllWords,
		testWords: testWords,
		addLetters: addLetters,
		findLetters: findLetters,
		removeAllLetters: removeAllLetters,
		testLetters: testLetters
}

function error(e){
	console.log(e);
}