const app = require('express');
const teacherRouter = app.Router();
const checkUserAuth = require('../middlewares/userauth.js'); // Import the userAuth middleware for user authentication.
//
//
const {
    teacherPatch,
    teacherPost,
    teacherGet,
    teacherDelete
  } = require("../controllers/teacherController.js");

// listen to the task request
teacherRouter.get("/api/teachers",checkUserAuth , teacherGet);
teacherRouter.post("/api/teachers", checkUserAuth ,teacherPost);
teacherRouter.patch("/api/teachers",checkUserAuth , teacherPatch);
teacherRouter.put("/api/teachers",checkUserAuth , teacherPatch);
teacherRouter.delete("/api/teachers/:id", checkUserAuth ,teacherDelete)

module.exports = teacherRouter;