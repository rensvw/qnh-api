var Book = require('./books/model/bookModel'); 
var User = require('./users/model/user-model'); 
var config = require('./../config/config');
var jwt = require('jsonwebtoken');

var routes = () => {

    bookRouter = require('./books/routes/book-routes')(Book);
    userRouter = require('./users/routes/user-routes')(User);
    authRouter = require('./auth/routes/auth-routes')(User,jwt,config);

    return userRouter, bookRouter, authRouter;
    
}

module.exports = routes;