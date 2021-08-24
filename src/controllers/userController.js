const User = require('../models/user')
const bcrypt = require('bcryptjs')

//create new user in DB : SIGN UP (registration)
const addNewUser = async (req, res) => {
    //create a user with req.body information 
    //using User model
    const user = new User(req.body)
    try {
        //save user in database
        await user.save()
        //add token to user
        const token = await user.generateAuthToken()

        console.log("---token: ", token)
        //send successful response to client
        res.status(201).json({
            message: "User saved successfully",
            data: { user, token }
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            data: err
        })
    }
}
//login a user
const loginUser = async (req, res) => {
    //get email and password from client
    const email = req.body.email
    //password = 1234567
    const password = req.body.password
    try {
        //get user from DB
        const user = await User.findOne({ email: email })
        //user {
        //...
        // password: "$2b$10$Ul5neCtW5vImKgkzD6mi.uF.wquSa02l/X6aBPGsCq7YoCJuNryyC"
        // }
        if (!user) {
            res.status(404).json({
                message: "User does not exist",
                data: {}
            })
        }
        //if user exists check password of user
        //$2b$08$BipH4J5T2smBE5fV2TFBNO/bQ7Cqmq9qO6LIpvi4m3RzdfmiBEiMu
        const isMatch = await bcrypt.compare(password, user.password)
        console.log("isMatch: ", isMatch)
        if (!isMatch) {
            return res.status(404).json({
                message: "Users's password is incorrect",
                data: {}
            })
        }
        //generate token to user
        const token = await user.generateAuthToken()
        //send successful response to client
        res.status(200).json({
            message: "User logged successfully",
            data: { user, token }
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            data: error
        })
    }
}


module.exports = {
    addNewUser,
    loginUser
}