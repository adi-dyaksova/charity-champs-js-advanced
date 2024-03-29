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
const dboperations = require("./database/dboperations");
// var router = express.Router();
const host = "localhost";
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use('/api', router);
app.set('views', './frontend');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

// Set static folder
app.use(express.static(path.join(__dirname, "frontend")));

const botName = "CharityChamps Bot";


// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);


    dboperations.getMessages(room).then(res => {
      //Display old messages from room
      res.forEach(message => socket.emit("message", formatMessage.formatOldMessage(message)));
      // Welcome current user
      socket.emit("message", formatMessage.formatNewMessage(botName, "Welcome to Charity Champs Chat!"));
    });


    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage.formatNewMessage(botName, `${user.username} has joined the chat`)
      );

    //Add message to database
    const msgObj = formatMessage.formatNewMessage(botName, `${user.username} has joined the chat`) 
    msgObj.room = user.room;
    dboperations.addMessage(msgObj).then(t => console.log(t));

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);


    io.to(user.room).emit("message", formatMessage.formatNewMessage(user.username, msg));

    //Add message to database
    const msgObj = formatMessage.formatNewMessage(user.username, msg); 
    msgObj.room = user.room;
    dboperations.addMessage(msgObj).then(t => console.log(t));

  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage.formatNewMessage(botName, `${user.username} has left the chat`)
      );

      //Add message to database
      const msgObj = formatMessage.formatNewMessage(botName, `${user.username} has left the chat`) //time can be different
      msgObj.room = user.room;
      dboperations.addMessage(msgObj).then(t => console.log(t));

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});


app.get('/users', (req, res) => {
  dbOperations.getUsers().then(result => res.json(result));
})

app.post('/addUser', (req, res) => {
  let user = { ...req.body };
  dbOperations.addUser(user).then(result => res.status(201).json(result));

})
app.get('/getFilters', async (req, res) => {
  const data = {
    durations: await dbOperations.getDurations(),
    categories: await dbOperations.getCategories(),
    cities: await dbOperations.getCities()
  }
  res.status(200).json(data);
})

app.get('/getCauses', async (req, res) => {
  const causes = await dboperations.getCauses();
  res.status(200).json(causes);
})

app.post('/addCause', (req, res) => {
  let cause = { ...req.body };
  dbOperations.addCause(cause).then(result => {
    res.status(201).json(result)
  })
})

app.get('/getCreatedCauses/:id', (req, res) => {
  const id = req.params.id;
  dbOperations.getCreatedCausesByUser(id).then(result => {
    res.status(201).json(result);
  })
})

app.get('/getCause/:id', (req, res) => {
  const id = req.params.id;
  dbOperations.getCause(id).then(result => {
    res.status(201).json(result);
  })
})

app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  dbOperations.getUser(id).then(result => {
    res.status(201).json(result);
  })
})

app.delete('/deleteVolunteeredCause/:id', (req, res) => {
  const id = req.params.id;
  dbOperations.deleteVolunteeredCause(id).then(result => {
    res.status(204).json(result);
  })
})

app.delete('/deleteCreatedCause/:id', (req, res) => {
  const id = req.params.id;
  dbOperations.deleteCause(id).then(result => {
    res.status(204).json(result);
  })
})

app.get('/getVolunteeredCauses/:id', (req, res) => {
  const id = req.params.id;
  dbOperations.getVolunteeredCausesByUser(id).then(result => {
    res.status(201).json(result);
  })
})


app.post('/getFilteredCauses', async (req, res) => {
  let filters = { ...req.body };

  const test = await dbOperations.getFilteredCauses(filters);
  res.status(200).json(test);

})


app.post('/addUserCause', (req, res) => {
  let user_cause = { ...req.body };
  dbOperations.addUserCause(user_cause).then(result => {
    res.status(201).json(result)
  })


})


server.listen(port, () => {
  console.log(`Server is running at ${host}:${port}`)
});