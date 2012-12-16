

/*
    HTTP server for standalone monitoring client.
 */

var app = require('express').createServer()
var io = require('socket.io').listen(app);

app.listen(9999);

// routing
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/www/index.html');
});

// servers broadcasting stats
var servers = {};

io.sockets.on('connection', function (socket) {

    // when the client emits 'sendchat', this listens and executes
    socket.on('sendchat', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters
        //io.sockets.emit('updatelog', socket.monip, data);
    });

    // when the client emits monitor this ip.
    socket.on('monip', function(monip){
        // echo to client that server is selected.
        var monitor_this = {};
        monitor_this[monip] = monip;
        socket.emit('updatemonitor', monitor_this);
        socket.emit('updateservers', servers);

    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function(){
        // remove the username from global usernames list
        delete servers[socket.monip];
        // update list of users in chat, client-side
        io.sockets.emit('updateservers', servers);
    });
});




/*
    health parsing server.
 */

var net = require('net');

var sockets = [];
 
/*
 * Cleans the input of carriage return, newline
 */
function cleanInput(data) {
	var newdata = data.toString().replace(/(\r\n|\n|\r)/gm,"");
	newdata = newdata.replace(/\|/gm, " ");
	newdata = newdata.replace(/\s+/g, " ");
	newdata = newdata.split(" ");
	return newdata;
}
 
/*
 * Method executed when data is received from a socket
 */
function receiveData(socket, data) {

	if(data.toString().match(/\-/)) {
        // annouce new connection to channel.
        servers[socket.remoteAddress] = socket.remoteAddress;
        io.sockets.emit('updateservers', servers);

		// Get the fields from the header, this way we provide SOME id of what we deal with.
		var header = data.toString().split("\n");
		fields = header[1].replace(/\|/g, " ");
		fields = fields.replace(/\s+/g, " ");
		fields = fields.replace(/\s+/, "");
		fields = fields.split(" ");
		return; // stop processing here.
	}	

	var cleanData = cleanInput(data);

	var record = {};

	// First element of the array will be the HOST ip.
	record['server_addr'] = socket.remoteAddress;

	for(var i=0;i<cleanData.length;i++) {
		if(cleanData[i]) {
			// dont assign empty vars to items.
			record[fields[i]] = cleanData[i];
		}
	}

	// turn array into json.
	var msgHealth;

	msgHealth = JSON.stringify(record);

	//console.log("\n");
    io.sockets.emit('updatelog', socket.remoteAddress, msgHealth);
	//console.log(msgHealth);

}
 
/*
 * Method executed when a socket ends
 */
function closeSocket(socket) {
	var i = sockets.indexOf(socket);
	if (i != -1) {
		sockets.splice(i, 1);
	}
}
 
/*
 * Callback method executed when a new TCP socket is opened.
 */
function newSocket(socket) {
    var remoteAddress = socket.remoteAddress;
	sockets.push(socket);
	socket.on('data', function(data) {
		receiveData(socket, data);
	})



	socket.on('end', function(socket) {
        console.log('ending... ' + remoteAddress);
        delete servers[remoteAddress];
        // update list of servers in monitoring mode, client-side
        io.sockets.emit('updateservers', servers);

		closeSocket(socket);
	})
}
 
// Create a new server and provide a callback for when a connection occurs
var server = net.createServer(newSocket);
 
// Listen on port 8888
server.listen(8888);
console.log("Collector running on port 8888");
