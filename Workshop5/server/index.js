const express = require('express');
const database = require('./database');
//
const app = express();
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const teacherRouter = require('./routes/teacherRoute');
app.use(teacherRouter);
const courseRouter = require('./routes/courseRoute');
app.use(courseRouter);
const careerRouter = require('./routes/careerRoute');
app.use(careerRouter);
const userRouter = require('./routes/userRoute');
app.use(userRouter);



app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})

