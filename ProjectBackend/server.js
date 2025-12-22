const express = require("express")
const studentRouter = require("./routes/courses")

 const app = express()
 app.use(express.json())
 app.use(studentRouter)
 app.listen(4000,'localhost',()=>{
    console.log("server started at port 4000")
 })