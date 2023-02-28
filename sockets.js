let playerReadyCounter = 0;

function listen(io) {
  const pongNameSpace = io.of("/pong");
  let room;
  pongNameSpace.on("connection", (socket) => {
    //we only have access to socket when a connection event is handled
    console.log("a user connected", socket.id);

    socket.on("ready", () => {
      room = "room" + Math.floor(playerReadyCounter / 2);
      socket.join(room);

      console.log("player ready", socket.id, room);

      playerReadyCounter++;

      if (playerReadyCounter % 2 === 0) {
        pongNameSpace.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      // paddledata is the data received from the paddleMove event that was emitted from the client
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`);
      socket.leave(room);
    });
  });
}

module.exports = { listen };
