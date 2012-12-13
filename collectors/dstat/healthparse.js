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

	console.log("\n");
	console.log(msgHealth);

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
	sockets.push(socket);
	socket.on('data', function(data) {
		receiveData(socket, data);
	})
	socket.on('end', function() {
		closeSocket(socket);
	})
}
 
// Create a new server and provide a callback for when a connection occurs
var server = net.createServer(newSocket);
 
// Listen on port 8888
server.listen(8888);
