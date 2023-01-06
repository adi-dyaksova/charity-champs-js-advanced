const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./chat-utils/messages");

const dbOperations = require('./database/dboperations');
var User = require('./database/Models/User');

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./chat-utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

var bodyParser = require('body-parser');
var cors = require('cors');
var router = express.Router();
const host = "localhost";
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

// Set static folder
app.use(express.static(path.join(__dirname, "frontend")));

const botName = "CharityChamps Bot";


// Run when client connects
io.on("connection", (socket) => {
  console.log(io.of("/").adapter);
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});


app.get('/users',(req, res) => {
  dbOperations.getUsers().then(result => res.json(result));
})

app.post('/addUser',(req, res) => {
  let user = {... req.body};
  dbOperations.addUser(user).then(result => res.status(201).json(result));

})


server.listen(port, () => {
  console.log(`Server is running at ${host}:${port}`)
});