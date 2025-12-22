//importing the express
const express = require("express")
//importing the router
const router = express.Router()
//importing the pool
const pool = require("../db/pool")
const result = require("../utils/result")
//login for user 
router.post("/",(req,res)=>{
    const {email,password} = req.body
    const sql =`select * from users where email = ? and password=?`
    pool.query(sql,[email,password],(error,data)=>{
        if(error){
            res.send(result.createResult(error))
        }
        else if(data.length == 0){
            res.send(result.createResult("invalid email or password"))
        }
        else{
             res.send(result.createResult(null,data))
        }
    })
})

//get courses for user
router.get("/",(req,res)=>{
    const sql = `select * from courses where end_date>=current_date`
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

// add course
router.post("/add/:cid",(req,res)=>{
    const cid = req.params.cid
    const {course_name,description,fees,start_date,end_date,video_expire_days} = req.body
    const sql = `insert into courses values(?,?,?,?,?,?,?)`
    pool.query(sql,[cid,course_name,description,fees,start_date,end_date,video_expire_days],(error,data)=>{
        res.send(result.createResult(error,data))
    }) 
})
//delet course 
router.delete("/delete/:cid",(req,res)=>{
    const cid = req.params.cid
    const sql = `delete from courses where course_id = ?`
    pool.query(sql,[cid],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})


//update courses
router.put('/update/:course_id', (req, res) => {
    const { course_id } = req.params;
    const { course_name, description, fees, start_date, end_date, video_expire_days } = req.body;

    const sql = `
        UPDATE courses
        SET course_name = ?, description = ?, fees = ?, start_date = ?, end_date = ?, video_expire_days = ?
        WHERE course_id = ?
    `;

    pool.query(
        sql,
        [course_name, description, fees, start_date, end_date, video_expire_days, course_id],
        (error, data) => {
            res.send(result.createResult(error, data));
        }
    );
});
// sign up for user
module.exports = router 