var express = require('express');
var config = require('./../../../config/config');
var jwt    = require('jsonwebtoken'); 
var User = require('../../users/model/user-model'); 

var routes = (User) => {

    var userRouter = express.Router();
    var userController = require('./../controller/user-controller')(User);
    var authController = require('./../../auth/controller/auth-controller')(User,jwt,config);

    userRouter.use('/users', authController.verifyToken);
    // check token before authentication
    userRouter.route('/users')
        .get(userController.getAllUsers)
        .post(userController.createUser);

    userRouter.use('/users/:userId', (req, res, next) => {
        User.findById(req.params.userId, (err, user) => {
            if (err) {
                res.status(500).send(err, "Shit goes wrong")
            } else if (user) {
                console.log(user);
                req.user = user;
                next();
            } else {
                res.status(404).send("no user found");
            }
        });
    })
    userRouter.route('/users/:userId')
        .get((req, res) => {
            res.json(req.user);
        })
        .put((req, res) => {
            req.user.firstName = req.body.firstName;
            req.user.lastName = req.body.lastName;
            req.user.password = req.body.password;
            console.log(req.user);
            req.user.save((err) => {
                
                err ? res.status(500).send(err) : res.json(req.user)
            });
        })
        .patch((req, res) => {
            if (req.body._id)
                delete req.body._id;
            if (req.body.userName)
                delete req.body.userName;
            for (let p in req.body) {
                req.user[p] = req.body[p];
            }
            req.user.save((err) => {
                err ? res.status(500).send(err) : res.json(req.user)
            })
         })
        .delete((req,res)=>{
                req.user.remove((err) => {
                    err ? res.status(500).send(err) : res.json(req.user)
                    console.log(req.user);
                })
            })

    return userRouter;
}

module.exports = routes;    