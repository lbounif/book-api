//Creation of server in Nodejs
//1. Import express
const express = require("express")
require("./db/mongoose")
const bookRouter = require("./routes/bookRouter")

//2. Call express function and save it in app
const app = express()

app.use(express.json())
app.use(bookRouter)

//3. Define a port
const port = process.env.PORT || 10010

//4. Listen to the port
app.listen(port, ()=> {
    console.log(`Server is up on port: ${port}`)
})