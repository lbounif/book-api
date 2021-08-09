const mongoose = require('mongoose')
const validator = require('validator')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true //trim removes unnecessary spaces at the begining and the end
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0)  {
                throw new Error('rating must be a positif number')
            }
        }
    },
    nbVoters: {
        type: Number,
        default: 1,
        validate(value) {
            if(value < 0)  {
                throw new Error('nbVoters must be a positif number')
            }
        }
    },
    img: {
        type: String,
        default: "https://miro.medium.com/max/3200/1*xdo0UBpyszvD7-7EH4TkIA.png"
    }
}, {
    timestamps: true //createdAt, updatedAt
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book