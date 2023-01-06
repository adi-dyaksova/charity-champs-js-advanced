var Db = require('./database/dboperations');
var User = require('./database/Models/User');
var cause = require('./database/Models/Cause');
var city = require('./database/Models/City');
var category = require('./database/Models/Category');
var duration = require('./database/Models/Duration');
const dbOperations = require('./database/dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const path = require("path");
var app = express();
var router = express.Router();
const host = "localhost";
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


// app.use(express.static('css'));
// app.use(express.static('/images'));
// app.use(express.static('/JavaScript'));
app.use(express.static('frontend'));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'css/catalog.css'));
// })
//
// app.get('/register.html', (req, res) => {
//     res.sendFile(path.join(__dirname, '../register.html'));
// })

app.get('/users',(req, res) => {
    dbOperations.getUsers().then(result => res.json(result));
})

app.post('/addUser',(req, res) => {
    let user = {... req.body};
    dbOperations.addUser(user).then(result => res.status(201).json(result));

})



app.listen(port, () => {
    console.log(`Server is running at ${host}:${port}`)
});

