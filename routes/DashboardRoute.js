const Controller = require("../controllers/DashBoardController");

const router = require("express").Router();

router.get(
  "/GetDashBoardClientIdVelo/:id",
  Controller.GetDashBoardClientIdVelo
); //get the config file
router.post("/ClearResultsDataDashboard", Controller.ClearResultsDataDashboard); //get the config file
router.post("/UpdateTimeSketchTagsInConfig", Controller.UpdateTimeSketchTagsInConfig); //get the config file
router.get("/ClearTimeSketchTagsInConfig", Controller.ClearTimeSketchTagsInConfig); //get the config file
router.get("/:DashBoardName", Controller.GetDashBoardFile); //get the config file

module.exports = router;
