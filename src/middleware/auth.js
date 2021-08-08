const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    //token sent by client:
    //Bearer 00D4L000000gmbH!AQsAQA2y84ZrjU93I.ztP1.qN02f9ug2tfqPNXJVCyi26FQ84zC5bxIGWciKW5H4hPQabCzCXyd1g_9eju6oU7GuGF8bPi2G
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        //token = 00D4L000000gmbH!AQsAQA2y84ZrjU93I.ztP1.qN02f9ug2tfqPNXJVCyi26FQ84zC5bxIGWciKW5H4hPQabCzCXyd1g_9eju6oU7GuGF8bPi2G

        console.log("token: ", token)
        //decode token to get the user's id
        const decoded = jwt.verify(token, "mysecret")

        console.log("decoded: ", decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        console.log("user: ", user)
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user

        next()
    } catch (error) {
        res.status(401).json({
            message: 'Not authorized !Please authenticate'
        })
    }


}

module.exports = auth