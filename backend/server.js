import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());

io.on("connection", (socket) => {
  console.log("socket connected");
});

app.post("/files", async (req, res) => {
  console.log("connected");

  io.emit("connectedbro", {
    msg: "hello",
  });

  res.send("hello");
});

server.listen(3000, () => {
  console.log("server running");
});