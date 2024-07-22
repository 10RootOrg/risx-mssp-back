const { GetDashBoardFile } = require("../controllers/DashBoardController");

const router = require("express").Router();

router.get("/:DashBoardName", GetDashBoardFile); //get the config file

module.exports = router;
