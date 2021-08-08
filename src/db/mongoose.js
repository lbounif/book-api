const mongoose = require("mongoose")
require('dotenv').config()

const MONGODB_URL = `mongodb://${process.env.DB_HOST}:
${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
})