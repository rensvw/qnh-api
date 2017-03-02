var express = require('express');
var config = require('./../../../config/config');
var jwt    = require('jsonwebtoken'); 
var User = require('../../users/model/user-model'); 

var routes = (Book) => {

    var bookRouter = express.Router();
    var bookController = require('../controller/book-controller')(Book);
    var authController = require('./../../auth/controller/auth-controller')(User,jwt,config);

    
    bookRouter.use('/books',authController.verifyToken);

    bookRouter.route('/books')
        .post(bookController.createBook)
        .get(bookController.getAllBooks);

    bookRouter.use('/books/:bookId', (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                res.status(500).send(err)
            } else if (book) {
                req.book = book;
                next();
            } else {
                res.status(404).send("no book found");
            }
        });
    })
    bookRouter.route('/books/:bookId')
        .get((req, res) => {
            res.json(req.book);
        })
        .put((req, res) => {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save((err) => {
                err ? res.status(500).send(err) : res.json(req.book)
            });
        })
        .patch((req, res) => {
            if (req.body._id)
                delete req.body._id;
            for (let p in req.body) {
                req.book[p] = req.body[p];
            }
            req.book.save((err) => {
                err ? res.status(500).send(err) : res.json(req.book)
            })
         })
        .delete((req,res)=>{
                req.book.remove((err) => {
                    err ? res.status(500).send(err) : res.json(req.book)
                })
            })
    return bookRouter;
}

module.exports = routes;