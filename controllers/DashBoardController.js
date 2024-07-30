const path = require("path");
const { GetDashFile } = require("../models/DashboardModals");

async function GetDashBoardFile(req, res, next) {
  try {
    console.log("req.params req.params req.params", req.params);
    const DashBoardFile = await path.resolve(
      __dirname,
      "..",
      "..",
      "risx-mssp-python-script",
      "response_folder",
      "dashboard.json"
    );
    console.log("DashBoardFile", DashBoardFile);

    const file = await GetDashFile(DashBoardFile);
    if (file) {
      switch (req.params.DashBoardName) {
        case "Forensics":
          res.send({
            Velociraptor: file.Velociraptor,
            TimeSketch: file.TimeSketch,
          });

          break;
        case "CTI":
          res.send({
            Misp: file.Misp,
            LeakCheck: file.DashboardsFromResponses.LeakCheck,
          });

          break;
        default:
          res.send(file);
          break;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { GetDashBoardFile };
