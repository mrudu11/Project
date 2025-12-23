student1
const express = require("express")
const studentRouter = require("./routes/student")
const coursesRouter = require("./routes/courses")

const express = require("express");
const studentRouter = require("./routes/courses");
const coursesRouter = require("./routes/courses");
const vdoRouter = require("./routes/video");
const studRouter = require("./routes/video");


const app = express();
app.use(express.json());

app.use("/students", studentRouter);
app.use("/course", coursesRouter);
app.use("/vdo", vdoRouter);
app.use("/stud", studRouter);

app.listen(4000, "localhost", () => {
  console.log("server started at port 4000");
});
