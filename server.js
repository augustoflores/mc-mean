var express = require('express');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = "mctrainee";

var logRoutes= require("./routes/logs");
var peopleRoutes= require("./routes/people");
var viewRoutes= require("./routes/views");
var cors = require('cors');

var app = express();

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8000'}));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
//
app.use("/logs",logRoutes)
app.use("/people",peopleRoutes)
app.use("/",viewRoutes)

app.listen(4000, function () {
  console.log('Example app listening on port 4001');
});
