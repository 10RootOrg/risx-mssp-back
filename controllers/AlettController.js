const { GetAlertsFile } = require("../models/AlertModal");

async function GetAlertFileData(req, res, next) {
  try {
    const [data] = await GetAlertsFile();
    console.log(data, "sdsdsdsdsdsdsdsdsd");
    res.send(data);
  } catch (error) {
    console.log(error, "GetAlertFileData GetAlertFileData");
  }
}

module.exports = {
  GetAlertFileData,
};
