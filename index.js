const http = require('http');
const express = require('express');
const app = express();
const { dbConnection } = require('./config/dbConnection');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userRoutes);
dbConnection();

console.log('Hello : ');
app.get('/', async(req, res) => {
  res.end('Hello World');
  console.log('Hello World');
}).listen(8080, () => {console.log('App is Running on Post number : 8080..')});