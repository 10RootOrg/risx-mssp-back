const { GetAlertsFile, UpdateAlertFile } = require("../models/AlertModal");

async function GetAlertFileData(req, res, next) {
  try {
    const data = await GetAlertsFile();
    // console.log(data, "sdsdsdsdsdsdsdsdsd");
    res.send(data);
  } catch (error) {
    console.log(error, "GetAlertFileData GetAlertFileData");
  }
}

async function UpdateAlertFileData(req, res, next) {
  try {
    console.log("hello update ", req.body);
    const { Info } = req.body;
    Info.UserInput.UserId = "User";

    const up = await UpdateAlertFile(Info);
    if (up) {
      res.send(up);
    } else {
      res.status(404).send("No Such alert");
    }
  } catch (err) {
    console.log("Error In Update alert file ", err);
    res.status(404).send({ msg: "Error in update", error: err });
  }
}

module.exports = {
  GetAlertFileData,
  UpdateAlertFileData,
};
