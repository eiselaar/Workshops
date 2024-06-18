const express = require('express');
const courseRouter = express.Router();

const {
  coursePost, courseGet, courseDelete,
} = require('../controllers/courseController.js');

// course
courseRouter.get("/api/courses", courseGet);
courseRouter.post("/api/courses", coursePost);
courseRouter.delete("/api/courses/:id", courseDelete);

module.exports = courseRouter;
