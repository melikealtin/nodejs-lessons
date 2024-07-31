const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

app.use(cors());
app.use(express.json());

app.post("/api/message", (req, res) => {
  const message = req.body.message;
  io.emit("message", message);
  res.send({ status: "success" });
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });

  socket.emit("WELCOME_MESSAGE", `Oooo ${socket.id}, welcome!`);

  socket.on("SEND_MESSAGE", (data) => {
    console.log(`received custom message: ${data}`);
    io.emit("message", data);
  });

  // socket - to send a message to a connected user
  // io - to send a message to all users in the socket

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);

  io.on("connection", (socket) => {
    console.log("HOPPAAAAAA");
    console.log(socket);
  });
});
