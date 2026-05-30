import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import multer from 'multer'


const app = express();


const server = createServer(app);

const upload=new multer({
    dest:"uploads/"
})

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());

io.on("connection", (socket) => {
  console.log("socket connected");
});

app.post("/files",upload.array("files"),async (req, res) => {

    io.emit("new file uploaded",{
        msg:"files uploaded",
        file:req.files[0].originalname
    })
  res.send("uploaded");
});

server.listen(3000, () => {
  console.log("server running");
});