let url = "/document";


var requestConfig = {
		method: "GET",
		url: "user_data",
		dataType: "json"
};

/*
	$.ajax(requestConfig).then(function success(response, type, one, two, three){
		let element = document.createElement("P");
		element.appendChild(document.createTextNode(response + " " + type + " " + one));
		document.body.appendChild(element);
		console.log(response);
		console.log(type);
		console.log(one);
		console.log("space");
	}, function fail(data, status, thing){
		alert('Request failed.  Returned status of ' + thing);
	});
	*/


loaddocs();

async function loaddocs(){
	let k = await $.getJSON('/user_data');
	//console.log(JSON.stringify(k));
	//console.log(k);
	//console.log(k._documents);
	//console.log(JSON.parse(k));
	console.log("ran");
	let documents = k._documents;
	if(typeof documents == 'undefined')
		return;
	for (let i = 0; i < documents.length; i++){
		//console.log("Ran too");
		await getDoc(documents[i]);
	}
}

async function getDoc(_id){
	//console.log("In here.");
	console.log(_id);
	let doc = await $.getJSON('/document', {id: _id});
	console.log(_id);
	//console.log("Hanging here?");
	let article = document.createElement("ARTICLE");
	let words = document.createElement("UL");
	let letters = document.createElement("UL");
	let title = document.createElement("h1");
	
	title.appendChild(document.createTextNode(doc.header._title));
	//console.log("crack");
	console.log(Object.keys(doc.words));
	
	for(let i = 1; i<Object.keys(doc.words).length-1; i++){
			let temp =	document.createElement("LI");
			let text = document.createTextNode(Object.keys(doc.words)[i]+" : "+Object.values(doc.words)[i]+" : "+Object.values(doc.words)[i]/Object.values(doc.words)[Object.values(doc.words).length-1]*100+"%");
			//console.log(text);
			temp.appendChild(text);//This MAY have been too much. >_>;
			words.appendChild(temp);
	}
	
	for(let i = 1; i<Object.keys(doc.letters).length-1; i++){
		let temp = document.createElement("LI")
		let text = document.createTextNode(Object.keys(doc.letters)[i]+" : "+Object.values(doc.letters)[i]+" : "+Object.values(doc.letters)[i]/Object.values(doc.letters)[Object.values(doc.letters).length-1]*100+"%");
		temp.appendChild(text);//This MAY have been too much. >_>;
		letters.appendChild(temp);
		//The above (and the copy further up) add li's to the parent object with the key:value:percentage.
	}
	
	article.appendChild(title);
	article.appendChild(words);
	article.appendChild(letters);
	
	
	//element.appendChild(document.createTextNode(doc));
	document.body.appendChild(article);
	//console.log(doc);
	console.log("Uh... ran?");
}




//$.getJSON('/user_data', function(data){
//	alert(data);
//	let element = document.createElement("P");
//	element.appendChild(document.createTextNode(data));
//	document.body.appendChild(element);
//});
