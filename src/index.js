//Creation of server in Nodejs
//1. Import express
const express = require("express")
const cors = require("cors")
require("./db/mongoose")
const bookRouter = require("./routes/bookRouter")
const userRouter = require("./routes/userRouter")

//2. Call express function and save it in app
const app = express()
//middlewares
app.use(cors())
app.use(express.json())
app.use(bookRouter)
app.use(userRouter)


//3. Define a port
const port = process.env.PORT || 10010

//4. Listen to the port
app.listen(port, ()=> {
    console.log(`Server is up on port: ${port}`)
})