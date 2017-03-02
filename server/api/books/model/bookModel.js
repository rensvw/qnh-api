var mongoose = require('mongoose'),
    Schema = mongoose.Schema();
    mongoosePaginate = require('mongoose-paginate');
    Schema.plugin(mongoosePaginate);

var bookModel = new mongoose.Schema({
    title: { type: String},
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false }
});

var Book = mongoose.model('Book', bookModel);
module.exports = Book;