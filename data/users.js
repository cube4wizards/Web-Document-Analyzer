/**
 * http://usejsdoc.org/
 */

const bcrypt = require('bcrypt-nodejs');

let users = [
	{ username: "masterdetective123",
		hashedPassword:"$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.",
		firstName: "Sherlock",
		lastName: "Holmes",
		profession: "Detective",
		bio: "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a \"consulting detective\" in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard."
		},
	{ username: "lemon",
		hashedPassword: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm",
		firstName: "Elizabeth",
		lastName: "Lemon",
		profession: "Writer",
		bio: "Elizabeth Miervaldis \"Liz\" Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan."
		},
	{ username: "theboywholived",
		hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
		firstName: "Harry",
		lastName: "Potter",
		profession: "Student",
		bio: "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles."}
]

//TODO Should find the relevant user, then check against the PW.
//... Could break. I dunno. Not really sure how the find function works.
users.validPassword = function(username, password){
	const temp = Find(username);
	console.log("User: "+username);
	console.log("Pass: "+password);
	console.log(temp);
	console.log(temp.hashedPassword);
	return bcrypt.compareSync(password, temp.hashedPassword);
}

users.getUser = Find;
	
function Find(username){
	const temp = users.find(function (temp) { console.log(username); console.log(temp.username); if(temp.username == username) return temp; });
	return temp;
}

module.exports = users;