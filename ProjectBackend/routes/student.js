//importing the express
const express = require("express")
//importing the router
const router = express.Router()
//importing the pool
const pool = require("../db/pool")
const result = require("../utils/result")

//student register to particular course 
router.post("/register",(req,res)=>{
    const  {courseId, email,name, mobileNo} = req.body
    const sql =`insert into student(course_id, email,name, mobile_no) values(?,?,?,?)`
    pool.query(sql,[courseId, email,name, mobileNo],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

//change password
router.post("/change",(req,res)=>{
    const {email,newPassword,confirmPassword} = req.body
    const sql = `update users set password = ? where email = ?`
    if(newPassword == confirmPassword){
        pool.query(sql,[newPassword,email],(error,data)=>{
        res.send(result.createResult(error,data))
        })
    }
    else{
        res.send(result.createResult("Please enter same new password"))
    }
})

//get courses
router.get("/getCourseStudent/:name",(req,res)=>{
    const name =req.params.name
    const sql = `select * from courses c inner join student s on c.course_id = s.course_id where name = ?`
    pool.query(sql,[name],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})
module.exports = router