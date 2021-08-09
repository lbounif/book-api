const express = require("express")
const bookController = require("../controllers/bookController")
// const 
// {   addBook,
//     getBooks, 
//     getBookById,
//     updateBook, 
//     deleteBook } = require("../controllers/bookController")

const bookRouter = express.Router()

bookRouter.post('/books', bookController.addBook)
bookRouter.get('/books', bookController.getBooks)
bookRouter.get('/books/:id', bookController.getBookById)
bookRouter.put('/books/:id', bookController.updateBook)
bookRouter.delete('/books/:id', bookController.deleteBook)


module.exports = bookRouter