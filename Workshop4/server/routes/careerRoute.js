const app = require('express');
const careerRouter = app.Router();

const {
    careerPost,careerGet,careerPut,careerDelete
  } = require("../controllers/careerController.js");

  // course
careerRouter.get("/api/careers", careerGet);
careerRouter.post("/api/careers", careerPost);
careerRouter.put("/api/careers", careerPut);
careerRouter.delete("/api/careers/:id", careerDelete);

module.exports = careerRouter;