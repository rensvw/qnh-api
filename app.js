var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./server/config/config');
var morgan = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var cors = require('cors');

const db = mongoose.connect(config.database);

var app = express();
var port = process.env.port || 3000;

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Routing
var Book = require('./server/api/books/model/bookModel'); 
var User = require('./server/api/users/model/user-model'); 
bookRouter = require('./server/api/books/routes/book-routes')(Book);
userRouter = require('./server/api/users/routes/user-routes')(User);
authRouter = require('./server/api/auth/routes/auth-routes')(User,jwt,config);

app.use('/api', userRouter, bookRouter, authRouter);


app.get('/', (req, res) => {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});


app.listen(port, (err) => {
    console.log('Gulp is running on Port: ' + port);
});