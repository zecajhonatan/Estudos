import express from "express";
let router = express.Router();

import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('posicao', (arg1, arg2) => {
    console.log(arg1, arg2)
    // io.emit('posicao', arg1, arg2);
  })
});

router.get('/map', (req, res) => {
  res.render("map/map.ejs")
})



export default router