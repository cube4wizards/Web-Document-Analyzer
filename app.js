/*

Okay, welcome to the big, fat, final project.
To not get murdered, I need:

1. A login system. Going to rebuild what I had from lab 9.
2. Code injection defenses on all input, logins included. See slides. XSS package.
3. I think I'm supposed to have exactly one AJAX feature? Unsure.
4. I need to accept some kind of text input, possibly in document form.
5. The input text needs to be chopped up and statistics need to be generated about it.
6. The above stats (and maybe a set of global stats if you have time) are displayed to users.
7. I need to make a video demo (like enterprise) and submit that alongside the code.

*/

/* Current status:
 * 
 * -Testing the signup/signin stuff. See users.js for the current issue.
 * 
 * New Login system now bleeping works.
 * Put error() and the promise catcher in any new async files. 
 * May want to increase bcrypt rounds. Up to you.
 * 
 * Reminders:
 * Use xss() on all user inputs.
 * Don't let people access files by filename... not that this should be an issue.
 * 
 * Still need to do:
 * Finish adding in new user functions.
 * 		-Signup page route/redirects.
 * 		-Signup submission route.
 * Figure out how to suck in input.
 * Sanitize input (should be a regex for that in a previous assignment) and chop it up.
 * Generate statistics from the tokens.
 * Somehow display some of these statistics to the user. Might wanna store intermediary stats.
 * 
 */

//Alright, this one's for the password server thing.
//Let's see how neat we can make this.

//Imports
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; //Yay for constants!
const passport = require('passport');
const flash = require('connect-flash');//This is for error messages. Or something.
const users = require('./mongo_access_objects/users.js');

//These are still imports, but they're more direct middleware.
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

//Not sure how this syntax works, but it lets me define the passport stuff elsewhere.
require('./config/passport')(passport);

//Now the app.use() stuff, which I think is basically middleware registry.
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true})); //Screw deprication warnings, man.

//Using ejs instead of handlebars. Might as well try somethin' different.
app.set('view engine', 'ejs');

//More use() stuff, but this is all required for Passport.
app.use(session({secret: 'prettysureanyrandomstringcangohere',
	resave: false,
    saveUninitialized: false
    })); //Options added because of deprication warnings. 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //This is for the flash messages.
app.use("/public", express.static(__dirname+"/public"));
console.log(__dirname);

//Routes. Doing them in a seperate file this time.
routes = require('./routes/routes.js');
routes(app, passport);


//And the part that actually starts the server.
app.listen(port);
console.log('Up and running on port ' + port); //Constants, amirite?

//let db = require("./mongo_access_objects/users.js");
//db.testLetters().catch(error);

function error(e){
	console.log(e);
}