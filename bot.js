var DubAPI = require('dubapi');
var schedule = require('node-schedule');
var fs = require('fs');	//For  writing to external files
var os = require('os');	// For date and time
var stdin = process.openStdin();	//Allow user input.

new DubAPI({username: 'mail@mail', password: 'password'}, function(err, bot) { // Log in
	if (err) return console.error(err);

	console.log('Running DubAPI v' + bot.version);
	function connect() {bot.connect('roomName');}

	bot.on('connected', function(name) {
		console.log('Connected to ' + name);
//		bot.sendChat('/me Yawns.');
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
		fs.appendFile("cuteBotLog.txt",datetime + ": " + data.user.username + ': ' + data.message + os.EOL);
	});
	
	var j = schedule.scheduleJob('* * * * * *', function(){
		bot.updub();
		console.log("Updubbing");
	});
	
});
