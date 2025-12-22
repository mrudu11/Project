// //importing the express
const express = require("express")
// //importing the router
const router = express.Router()
// //importing the pool
const pool = require("../db/pool")
const result = require("../utils/result")

// //student register to particular course 
// router.post("/")


//get all registered courses of student along with valid videos
router.get("getvideos/:reg_no",(req,res) =>{
    const reg_no = req.params.reg_no;
    const sql = `SELECT 
            c.course_name,
            v.video_id,
            v.title,
            v.youtube_url
        FROM student s
        INNER JOIN courses c ON s.course_id = c.course_id
        INNER JOIN videos v ON c.course_id = v.course_id
        WHERE s.reg_no = ? 
          AND v.is_valid = 1`
    pool.query(sql,[reg_no],(error,data))
})

module.exports=router