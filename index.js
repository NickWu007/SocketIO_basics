var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

	socket.on('user online', function(username) {
		console.log('user online' + username);
	    socket.emit('you online');
	    socket.broadcast.emit('user online' + username);
	});

	socket.on('user offline', function(username) {
		console.log('user online' + username);
	    socket.broadcast.emit('user offline' + username);
	});

	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});

http.listen(3000, function() {
	console.log('listening on port 3000');
})