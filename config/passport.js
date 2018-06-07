//Passport things.

const LocalStrategy = require('passport-local').Strategy;

const db = require('../mongo_access_objects/users.js');

const xss = require('xss');

const bcrypt = require('bcrypt-nodejs');

process.on('unhandledRejection', (reason, p) => {
	  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
	  // application specific logging, throwing an error, or other logic here
	});

module.exports = function(passport){
	//Do I need serializer functions...?
	
	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
			  async function(req, username, password, done) {
				  //console.log("User: "+username);
				  //console.log("Pass: "+password);
				  username = xss(username);
				  password = xss(password);
				    user = await db.findUser(username).catch(error);
				    //console.log(user);
				    //console.log("OH MY GOD, THIS SHOULD NOT BE PENDING.");
				      if (!user) {
				        return done(null, false, req.flash('loginMessage', 'No user found.'));
				      }
				      //console.log("Incorrect arguments my ass.");
			    	  if (await !validPassword(user, password).catch()) {
			    		  return done(null, false, req.flash('loginMessage', 'Incorrect password.'));
			    	  }
			    	  //console.log("Where the hell is that argument thing?");
			    	  return done(null, user);
				  }
				));
	
	passport.serializeUser(function(user, done) {
		  done(null, user);
		});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});
		
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	async function(req, username, password, done){
		//TODO See if you can adapt this from the tutorial.
		//You have a lot of strange discrepencies atm.
		
			let un = xss(username);
			let pass = xss(password);
			console.log("There we go. users.find(). ");
			user = await db.findUser(un).catch(error);
			console.log("We got the thing through!");
			console.log(user);
			if(user  != null){
				return done(null, false, req.flash('signupMessage', 'Username already in use.'));
			}
			console.log("Betting the hang is somewhere in here.");
			let temp = new Object();
			temp._username = un;
			console.log("Alright, it's not that obvious.")
			temp._password = bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
			console.log("So there IS an exception. Is Bcrypt just slow or...?")
			temp.documents = [];
			console.log("Unless it's HERE?");
			db.addUser(temp).catch(error);
			console.log("Not sure though.");
			return done(null);
		}
	
	))
	
}//TODO 'User' doesn't exist. It's 'users'. Make the required adjustments.

async function validPassword(user, password){
	//console.log("Pretty damn sure this is running.");
	if(typeof user != 'object' || typeof password != 'string')
		throw "Error in validPassword(). One of the arguments is the wrong type.";
	if(bcrypt.compareSync(password, user._password)){
		//console.log('Login success');
		return true;
	}
	//console.log('login failure');
	return false;
}

function error(e){
	console.log(e);
}

function locate (temp) { return temp.username == username; };