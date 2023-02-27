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

    if (playerReadyCounter % 2 === 0) {
      io.emit("startGame", socket.id);
    }
  });

  socket.on("paddleMove", (paddleData) => {
    // paddledata is the data received from the paddleMove event that was emitted from the client
    socket.broadcast.emit("paddleMove", paddleData);
  });

  socket.on("ballMove", (ballData) => {
    socket.broadcast.emit("ballMove", ballData);
  });
});

socket.on("disconnect", (reason) => {
  console.log(`Client ${socket.id} disconnected: ${reason}`);
});
