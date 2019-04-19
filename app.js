// BASE SETUP
// ================================================================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');    //call body-parser
const fs = require('fs');

const booksJson = "books.json";
const newBook = "newBook.json"

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
//================================================================================================================
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('What is happening in middleware ? ');
    next(); // make sure we go to the next routes and don't stop here
});


    // REGISTER OUR ROUTES 
//================================================================================================================
//================================================================================================================

    // all of our routes will start with "/api"
app.use('/api', router);

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api/test)
router.get('/test', function (req, res) {
    res.json({
        message: 'welcome to my test api!'
    });
});


    // on routes that end in /books
//================================================================================================================
//================================================================================================================

router.route('/books')

        // get all the books (accessed at POST http://localhost:8080/api/books)
    .get(function (req, res) {
        readDB((books) => {
            res.json(books);
        })
    })

        // create a book (accessed at POST http://localhost:8080/api/books)
    .post(function (req, res) {
        var myNewBook = "";
        var myListOfBooks = "";

        fs.readFile(newBook, 'utf8', (err, newBook) => {
            if (err) throw err;
            myNewBook = JSON.parse(newBook);
            fs.readFile(booksJson, 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    myListOfBooks = JSON.parse(data);
                    myListOfBooks.books.push(myNewBook);
                    var json = JSON.stringify(myListOfBooks); //convert it back to json
                    fs.writeFile('books.json', json, 'utf8', (err,data)=>{
                        console.log("New books created");
                    }); 
                }
            });
        });

    })

   
    // on routes that end in /books/:book_id
//================================================================================================================
//================================================================================================================
    
router.route('/books/:book_id')

    // get a book with an id (accessed at POST http://localhost:8080/api/books/:book_id)
    .get(function (req, res) {
        getBookById(req.params.book_id,  (books) => {
            res.json(books);
        })
    })
    
    // update the book with this id (accessed at POST http://localhost:8080/api/books/:book_id)
    .put(function (req, res) {
        res.json({
            message: 'welcome to my PUT book ID !'
        });
    })

    // delete the book with this id (accessed at POST http://localhost:8080/api/books/:book_id)
    .delete(function (req, res) {
        res.json({
            message: 'welcome to my DELETE book ID!'
        });
    });


    // Handle errors
//================================================================================================================
//================================================================================================================

app.get('/books/:book_id', (req, res, next) => {
    const userId = req.params.id
    if (!userId) {
        const error = new Error('missing id')
        error.httpStatusCode = 400
        return next(error)
    }

    Users.get(userId, (err, user) => {
        if (err) {
            err.httpStatusCode = 500
            return next(err)
        }

        res.send(users)
    })
})

// START THE SERVER
//================================================================================================================
app.listen(port);
console.log('Look how big is my port ' + port);

function getBookById(id, cb) {
    readDB((books) => {
        if (!id) {
            cb(books);
        } else {
            books.forEach(book => {
                if (book._id == id) {
                    cb(book);
                }
            });
        }
    })
}

function readDB(cb) {
    fs.readFile(booksJson, (err, data) => {
        if (err) throw err;
        let books = JSON.parse(data);
        cb(books);
    });
}

