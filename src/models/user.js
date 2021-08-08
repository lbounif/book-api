const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age can not be less than 0")
            }
        }
    },
    // token: {
    //     type String,
    //     required: true
    // } 
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

}, {
    timesstamps: true //add to model createdAt, updatedAt
})
//Generate auth token to every user
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, "mysecret")
    //add token to tokens array 
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
//Find a user by its credentials (email, password)
// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ email })

// }

//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    //user.password = await bcrypt.hash(user.password, 10)
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User




