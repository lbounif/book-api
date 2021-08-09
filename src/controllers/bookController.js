const Book = require("../models/book")

//Add a new book
const addBook = async(req, res) => {
    const book = new Book(req.body)
    console.log("book: ", book)
    try {
        //save book to DB
        const result = await book.save()
        console.log("result: ", result)

        //send success response to client
        res.status(201).json({
            message: "Book created successfully",
            data: result
        })

    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            data: error
        })
    }
}
//Get all books
const getBooks = async(req, res) => {
    try {
        //search for all books in DB
        const books = await Book.find()

        //send success response to client
        res.status(200).json({
            message: "Books fetched successfully",
            data: books
         })

    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            data: error
        })
    }
}
//Find a book by id 
const getBookById = async(req, res) => {
    const id = req.params.id
    try {
        const book = await Book.findById(id)
        if(!book){
            res.status(404).json({
                message: "Book not found",
                data: {}
            })
        }
        //send success response to client
        res.status(200).json({
            message: "Book fetched successfully",
            data: book
        })


    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            data: err
        })
    }
    
}
//update a book by Id
const updateBook = async(req, res) => {
    const id = req.params.id
    try {
        const book = await Book.findById(id)
        if(!book){
            return res.status(404).json({
                message: "Book not found",
                data: {}
            })
        }
        //if book exists update it
        const bookUpdated = await Book.updateOne({_id: id}, {...req.body})
        
        //send success response to client
        res.status(200).json({
            message: "Book updated successfully",
            data: bookUpdated
        })

    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            data: err
        })
    }
}
//delete a book by Id
const deleteBook = async(req, res) => {
    const id = req.params.id
    try {
        const book = await Book.findById(id)
        if(!book){
            return res.status(404).json({
                message: "Book not found",
                data: {}
            })
        }
        //if book exists delete it
        const bookDeleted = await Book.deleteOne({_id: id})
        
        //send success response to client
        res.status(200).json({
            message: "Book deleted successfully",
            data: bookDeleted
        })

    } catch(err) {
        res.status(500).json({
            message: "Internal server error",
            data: err
        })
    }
}

module.exports = {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}