const app = require('express');
const courseRouter = app.Router();
const checkUserAuth = require('../middlewares/userauth.js'); // Import the userAuth middleware for user authentication.
//
//
const {
    coursePost, courseGet, courseDelete,
  } = require("../controllers/courseController.js");
  
  
// course
courseRouter.get("/api/courses", checkUserAuth ,courseGet);
courseRouter.post("/api/courses",checkUserAuth , coursePost);


module.exports = courseRouter;