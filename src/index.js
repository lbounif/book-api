//1. Import express
const express = require("express")

//2. Call express function and save it in app
const app = express()

app.use(express.json())

//3. Define a port
const port = process.env.PORT || 10010

//4. Listen to the port
app.listen(port, ()=> {
    console.log(`Server is up on port: ${port}`)
})