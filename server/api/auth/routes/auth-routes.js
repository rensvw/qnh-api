var express = require('express');

var routes = (User,jwt,config) => {

    var authRouter = express.Router();
    var authController = require('./../controller/auth-controller')(User,jwt,config);

    authRouter.route('/signup')
        .post(authController.signUp);

    authRouter.route('/authenticate')
        .post(authController.authenticate);

    return authRouter;
}

module.exports = routes;