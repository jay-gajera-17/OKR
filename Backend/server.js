const express = require("express");
const router = express.Router();
const app = express();
const indexRoute = require("./src/routes/index.route");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api", indexRoute);
// app.options("*", cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", msg); //Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
