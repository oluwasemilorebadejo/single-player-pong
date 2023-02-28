let playerReadyCounter = 0;

function listen(io) {
  const pongNameSpace = io.of("/pong");
  pongNameSpace.on("connection", (socket) => {
    //we only have access to socket when a connection event is handled
    console.log("a user connected", socket.id);

    socket.on("ready", () => {
      console.log("player ready", socket.id);

      playerReadyCounter++;

      if (playerReadyCounter % 2 === 0) {
        pongNameSpace.emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      // paddledata is the data received from the paddleMove event that was emitted from the client
      socket.broadcast.emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`);
    });
  });
}

module.exports = { listen };
