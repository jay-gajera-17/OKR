const express = require("express");
const app = express();
const indexRoute = require("./src/routes/index.route");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const Message = require("./src/models/Message.model");
const connectDB = require("./src/config/database");
app.use(cors());
app.use(express.json());

connectDB();
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

  socket.on("joinRoom",(room)=>{
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  })

  socket.on("sendMessage", async (msg) => {
     const newMessage = new Message({
      username:msg.username,
      message:msg.message,
      room:msg.room||"general",
     })
     await newMessage.save();
     io.to(msg.room||"general").emit("receiveMessage",{
        id: newMessage._id,
        username:newMessage.username,
        message:newMessage.message,
        timestamp:newMessage.timestamp,
        room:newMessage.room,
     });
     console.log(`Message saved: ${msg.username}: ${msg.message}`);

  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
