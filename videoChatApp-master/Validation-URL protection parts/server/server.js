//mongodb
require('./config/db')

const http = require('http');
const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');

const { startPeerServer } = require('./peer/peer');
const { startSocketServer } = require('./socket/socket');
const Room = require('./room/room');

const app = express();

const port = 8000

const UserRouter = require('./api/User')

app.use(json())
app.use(cors());

app.use('/user', UserRouter)

const server = http.createServer(app);

server.listen(port,'0.0.0.0',() => {
    console.log(`Server running on port ${port}`);
  })
  

// will consist of all our participants
const rooms = []

app.post('/rooms', (req, res) => {
    const { body } = req;
    const newRoom = new Room(body.author);
    rooms.push(newRoom)
    res.json({
        roomId: newRoom.roomId
    })
})

app.get('/rooms/:roomId', (req, res) => {
    const { params } = req;
    const room = rooms.find(existingRooms => existingRooms.roomId === params.roomId);
    res.json({ ...room })
})

app.post('/rooms/:roomId/join', (req, res) => {
    const { params, body } = req;
    const roomIndex = rooms.findIndex(existingRooms => existingRooms.roomId === params.roomId);
    
    let room = null;

    if (roomIndex > -1) {
        room = rooms[roomIndex]
        room.addParticipant(body.participant);
        rooms[roomIndex] = room
    }

    res.json({ ...room.getInfo() })
})


startPeerServer();
startSocketServer(server, rooms);



