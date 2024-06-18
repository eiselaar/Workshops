const app = require('express');
const teacherRouter = app.Router();
//
const {
    teacherPatch,
    teacherPost,
    teacherGet,
    teacherDelete
  } = require("../controllers/teacherController.js");

// listen to the task request
teacherRouter.get("/api/teachers", teacherGet);
teacherRouter.post("/api/teachers", teacherPost);
teacherRouter.patch("/api/teachers", teacherPatch);
teacherRouter.put("/api/teachers", teacherPatch);
teacherRouter.delete("/api/teachers/:id", teacherDelete)

module.exports = teacherRouter;