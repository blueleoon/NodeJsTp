// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
const fs = require('fs');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
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

    // all of our routes will start with "/"
app.use('/', router);

    // test route to make sure everything is working (accessed at GET http://localhost:8080/test)
router.get('/test', function (req, res) {
    res.json({ message: 'welcome to my api!' });
});


    // on routes that end in /books
//================================================================================================================
//================================================================================================================

router.route('/books')

    // create a book (accessed at POST http://localhost:8080/books)
    .post(function (req, res) {
        var book = new book();      // create a new instance of the book model
        book.name = req.body.name;  // set the books name (comes from the request)
        // save the book and check for errors
        book.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'book created!' });
        });
    })

        // get all the books (accessed at POST http://localhost:8080/books)
    .get(function (req, res) {
        book.find(function (err, books) {
            if (err)
                res.send(err);
            res.json(books);
        });
    });


    // on routes that end in /books/:book_id
//================================================================================================================
//================================================================================================================
    
router.route('/books/:book_id')

    // get a book with an id (accessed at POST http://localhost:8080/books)
    .get(function (req, res) {
        book.find(function (err, books) {
            if (err)
                res.send(err);
            res.json(books);
        });
    })
    
    // update the book with this id (accessed at POST http://localhost:8080/books/:book_id)
    .put(function (req, res) {
        book.findById(req.params.book_id, function (err, book) {
            if (err)
                res.send(err);
            book.name = req.body.name;  // update the books info
            book.save(function (err) {
                if (err)
                    res.send(err);
                res.json({ message: 'book updated!' });
            });
        });
    })

    // delete the book with this id (accessed at POST http://localhost:8080/books/:book_id)
    .delete(function (req, res) {
        book.remove({
            _id: req.params.book_id
        }, function (err, book) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });


    // Handle errors
//================================================================================================================
//================================================================================================================

app.get('/isLogged',
    function checkIfIsLogged(req, res, next) {
        if (!req.user.isLogged) {
            next('route');
        }
    }, function getLogged(req, res, next) {
        getLogged.find(function (err, doc) {
            if (err) return next(err);
            res.json(doc);
        });
    });



app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
});


// START THE SERVER
//================================================================================================================
app.listen(port);
console.log('Look how big is my port ' + port);



