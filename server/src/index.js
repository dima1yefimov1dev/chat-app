import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {
  origin: '*',
}});

dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(express.json());

io.on('connection', socket => {
  socket.on('new user', userData => {
    const {username} = userData; 
    socket.username = username;

    console.log(`new user ${socket.username} has connected`);

    io.emit('new user', username);

  })

  socket.on('chatMessage', message => {
    const msg = {
      author: socket.username,
      text: message,
    }

    io.emit('chatMessage', msg);
  })
})

const startServer = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`server started successfully on port ${PORT}`);
    })

  } catch(ERR) {
    console.log(ERR);
  }
}

startServer();
