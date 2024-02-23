import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs')

// const __dirname = dirname(fileURLToPath(import.meta.url));
app.get('/', (req, res) => {
  // res.sendFile(join(__dirname, 'index.html'));

  res.render('index.ejs')
});

let dados = {}

io.on('connection', (socket) => {
  console.log('Novo Cliente Conectado')

  socket.on('updateLocation', (msg) => {
    dados[socket.id] = msg
    io.emit('updateLocation', dados);
  });

  socket.on('disconnect', () => {
    console.log('Novo Cliente Conectado')
    delete dados[socket.id];
    io.emit('updateLocation', dados);
  })
});


server.listen(80, () => {
  console.log('server running at http://localhost:3000');
});
