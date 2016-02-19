var DubAPI = require('dubapi');
var fs = require('fs');	//For  writing to external files
var os = require('os');	// For date and time
var stdin = process.openStdin();	//Allow user input.

new DubAPI({username: 'example@example', password: 'example}, function(err, bot) { // Log in
	if (err) return console.error(err);

	console.log('Running DubAPI v' + bot.version);
	function connect() {bot.connect('lolidub');}

	bot.on('connected', function(name) {
		console.log('Connected to ' + name);
	});

	bot.on('disconnected', function(name) {
		console.log('Disconnected from ' + name);

		setTimeout(connect, 15000);
	});

	bot.on('error', function(err) {
		console.error(err);
	});

	connect();
	//Everything from here on is commands, and functions
	
	stdin.addListener("data", function(d) {
		bot.sendChat(d.toString().trim()); //chat as bot
	});

	bot.on(bot.events.chatMessage, function(data) {	//monitor messages
		var datetime = new Date();
		console.log(data.user.username + ': ' + data.message);
		fs.appendFile("./logs/test.txt",datetime + ": " + data.user.username + ': ' + data.message + os.EOL);	
	});
});
