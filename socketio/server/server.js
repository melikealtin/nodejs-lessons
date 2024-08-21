const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 3000;
const JWT_SECRET = "JWT_TOKEN"; 

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

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "user" && password === "password") {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("No token provided"));
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return next(new Error("Invalid or expired token"));
    }
    socket.user = user;
    next();
  });
})


app.post("/api/send-message", (req, res) => {
  const { id, message } = req.body; 

  io.to(id).emit("message", message);
  res.send({ status: "Message sent" });
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);
  
  socket.join(socket.id);

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});


server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
