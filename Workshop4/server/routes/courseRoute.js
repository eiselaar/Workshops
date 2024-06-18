const app = require('express');
const courseRouter = app.Router();

const {
    coursePost, courseGet, courseDelete,
  } = require("../controllers/courseController.js");
  
  
// course
courseRouter.get("/api/courses", courseGet);
courseRouter.post("/api/courses", coursePost);


module.exports = courseRouter;