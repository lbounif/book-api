const express = require('express')
const {
    addNewUser,
    loginUser} = require('../controllers/userController')

const auth = require('../middleware/auth')
const router = new express.Router()

//Specify method and url used by client to connect 
//to this API
//register a user
router.post('/users', addNewUser)
//login a user
router.post('/users/login', loginUser)



module.exports = router