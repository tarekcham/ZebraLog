const io = require("socket.io")(3000);
const swearjar = require("swearjar");

const users = {};

// every time the user loged in, send this answer
io.on("connection", socket => {
  socket.on("new-user", name => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-user-answer", answer => {
    // filter not decent answers
    const check = swearjar.profane(answer);
    if (!check) {
      socket.broadcast.emit("user-answer", { answer, name: users[socket.id] });
    } else {
      socket.broadcast.emit("user-answer", {
        answer: "deleted answer",
        name: users[socket.id]
      });
    }
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
