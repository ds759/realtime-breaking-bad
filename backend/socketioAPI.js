var socket_io = require("socket.io");
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on("connection", function(socket) {
	console.log("A user connected");
});

socketApi.push = (namespace, data) => {
	io.sockets.emit(namespace, data);
};

module.exports = socketApi;
