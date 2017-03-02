var bookController = (Book) => {

    var createBook = (req,res) => {
         let book = new Book(req.body);
            book.save();
            res.status(201).send(book);
    }

    var getAllBooks = (req,res) => {
          let query = req.query;
          console.log(query);
            

            Book.find(query, (err, books) => {
                err ? console.log(err) : res.json(books);
            });
    }

    return{
        getAllBooks: getAllBooks,
        createBook: createBook
    }

}

module.exports = bookController;