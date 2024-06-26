const app = require('express');
const careerRouter = app.Router();
const checkUserAuth = require('../middlewares/userauth.js'); // Import the userAuth middleware for user authentication.
//
const {
    careerPost,careerGet,careerPut,careerDelete
  } = require("../controllers/careerController.js");

  // course
careerRouter.get("/api/careers",checkUserAuth, careerGet);
careerRouter.post("/api/careers",checkUserAuth, careerPost);
careerRouter.put("/api/careers",checkUserAuth, careerPut);
careerRouter.delete("/api/careers/:id",checkUserAuth, careerDelete);

module.exports = careerRouter;