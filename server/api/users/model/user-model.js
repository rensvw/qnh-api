var mongoose = require('mongoose'),
    Schema = mongoose.Schema();
    mongoosePaginate = require('mongoose-paginate');
    Schema.plugin(mongoosePaginate);

var userModel = new mongoose.Schema({

    userName: { type: String},
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    createdOn: { type: Date},
    admin: {type: Boolean, default: false}
});

var User = mongoose.model('User', userModel);
module.exports = User;