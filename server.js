const server = require("http").createServer();
const io = require("socket.io")(server);

const sockets = require("./sockets");

const PORT = 5500;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`listening on port ${PORT}`);
});

sockets.listen(io);
