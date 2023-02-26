const server = require("http").createServer();
const io = require("socket.io")(server);

const PORT = 8080;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`listening on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});
