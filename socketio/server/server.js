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


app.get("/api/message/:id", (req, res) => {
  const { id } = req.params;
  const message = `hos geldiniz ${id}`;
  io.to(id).emit("message", message);
  res.send({ message });
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);
  
  // socket.join(socket.id);

  // socket.on("SEND_MESSAGE", (data) => {
  //   const { recipientId, message } = data;
  //   console.log(`received custom message for ${recipientId}: ${message}`);
  //   io.to(recipientId).emit("message", message);
  // });

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
