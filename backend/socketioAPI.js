const io = require("socket.io")();

var socketioAPI = {
	io: io
};

io.on("connection", socket => console.log("A user connected"));
socketioAPI.push = (namespace, data) => io.sockets.emit(namespace, data);

module.exports = socketioAPI;
