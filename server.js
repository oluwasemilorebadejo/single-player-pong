const server = require("http").createServer();
const io = require("socket.io")(server);

const PORT = 5500;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`listening on port ${PORT}`);
});

let playerReadyCounter = 0;

io.on("connection", (socket) => {
  //we only have access to socket when a connection event is handled
  console.log("a user connected", socket.id);

  socket.on("ready", () => {
    console.log("player ready", socket.id);

    playerReadyCounter++;

    if (playerReadyCounter == 2) {
      io.emit("startGame", socket.id);
    }
  });
});
