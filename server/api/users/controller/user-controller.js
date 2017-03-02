var mongoose = require('mongoose');

var userController = (User) => {

    var getAllUsers = (req, res) => {
        var query = req.query;
     
        // Prepare paging parameters
/*var page = Math.max(0, req.query.page - 1); // using a zero-based page index for use with skip()
var take = req.query.test || 10;

var today = new Date(Date.now());
// only docs from the past 30 days
var dateFloor = (new Date()).setDate(today.getDate() - 30);
var filter = { created: { $gte: dateFloor } };

// cap the amount of docs queried
var query = User.find().limit(100).sort('-createdOn');

query.count(function (err, count) {
  query.skip(page * take).limit(take).exec('find', function (err, docs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json({
        count: count,
        take: take,
        page: page + 1,
        users: docs
      });
    }
   });
});*/

User.find(query, (err, users) => {
            err ? console.log(err) : res.json(users);
        });

    }

    var createUser = (req, res) => {
        let user = new User(req.body);
        User.findOne({userName: user.userName}, (err,existingUser) => {
            if(err || existingUser){
                // send true for existing user
                res.json("Error, username already exists!");
            }
            if (!existingUser){
                user.save();
                res.status(201).send(user);
            }
            })};
        
    

    return {
        getAllUsers: getAllUsers,
        createUser: createUser
    }
}

module.exports = userController;