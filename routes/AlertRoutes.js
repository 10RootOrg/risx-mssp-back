const { GetAlertFileData } = require("../controllers/AlettController");

const router = require("express").Router();

router.get("/GetAlertFileData", GetAlertFileData); //get the config file

module.exports = router;
