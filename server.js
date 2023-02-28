const http = require("http");
const io = require("socket.io");

const api = require("./api");
const sockets = require("./sockets");

const httpServer = http.createServer(api);
const socketServer = io(httpServer);

const PORT = 5500;
httpServer.listen(PORT, "127.0.0.1", () => {
  console.log(`listening on port ${PORT}`);
});

sockets.listen(socketServer);
