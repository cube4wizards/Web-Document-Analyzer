//So EVERYTHING'S in the export function.
const parsing = require('../util/parser.js');
const uuid = require('uuid');
const storage = require('../mongo_access_objects/storage.js');
const xss = require('xss');

module.exports = function(app, passport){
	
	//routes
	app.get('/', isNotLoggedIn, function(req, res){
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});
	
	app.get('/signup', alreadyLoggedIn, function(req, res) {
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	});
	
	//note the isLoggedIn middleware function.
	app.get('/private', isLoggedIn, function(req, res){
		//... Wait. I can send full objects in this response!
		//So I can tack on document data when I have it!
		res.render('profile.ejs', {user: req.user}); //This passes the user session to the template.
	});
	
	//This stuff is for the browser-side JS to make requests.
	app.get('/user_data',async function(req, res){
		//console.log("Request intercepted.")
		//console.log(req);
		if(req.user == 'undefined'){
			res.json({});
			//console.log("User undefined.");
		}
		else{
			console.log("User defined. If this runs, look at the data bounce.")
			let obj = new Object();
			user = await storage.findUser(req.user._username);
			obj._username = user._username;
			obj._documents = user._documents; //TODO add the _ back.
			console.log(obj);
			console.log(req.user._documents);
			
			res.json(obj);
		}
	});
	
	app.get('/document', async function(req, res){
		//console.log(req);
		//console.log("Yeah, we're hitting.");
		data = await storage.findData(req.query.id)
		console.log(data.header._title);
		console.log(data);
		//console.log(data);
		res.json(data);
	});
	
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/private',
		failureRedirect: '/',
		failureFlash: true
	}));
	
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/private',
		failureRedirect: '/signup',
	}));
	
	app.post('/document', isLoggedIn, function(req, res){
		//TODO Do things w/inputs.
		storage.addData(user, xss(req.body.title), xss(req.body.document));
		//Not sure this should redirect, but w/e.
		return res.redirect('/private');
	})
	
	app.get('*', function(req, res){
		res.status(404).send('Not found');
	})
	
};

//If they're not logged in, redirect to /.
function isLoggedIn(req, res, next){
	if(!req.isAuthenticated()) //Not sure where this function comes from.
		return res.redirect('/');
	return next();
}

//I then need a flipped version of the above for the / route's redirect.
function isNotLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		console.log("Redirecting");
		return res.redirect('/private');
	}
	return next();
}

//Once again, I needed a different redirect function.
//This one deflect people who are logged in from hitting the
//signup page.
function alreadyLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return res.redirect('/private');
	return next();
}