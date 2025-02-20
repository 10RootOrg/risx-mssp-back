const fs = require("fs"); // Import 'fs' with Promise-based API
const path = require("path");
const DBConnection = require("../db.js");
const relativePath = process.env.PYTHON_SCRIPTS_RELATIVE_PATH;
async function GetAlertsFile() {
  try {
    const DashBoardFile = await path.resolve(
      __dirname,
      "..",
      "..",
      relativePath,
      "response_folder",
      "alerts.json"
    );
    const file = await fs.readFileSync(DashBoardFile, "utf-8");
    const data = JSON.parse(file);
    const [users] = await DBConnection.raw(
      "select user_id,user_name from users"
    );
    users.forEach((user) => {
      data.forEach((alert) => {
        if (alert?.UserInput?.UserId == user.user_id) {
          alert.UserInput.UserId = user.user_name;
        }
      });
    });
    // console.log(users);

    const [[AletDic]] = await DBConnection.raw(
      'SELECT JSON_EXTRACT(config,"$.General.AlertDictionary") as a from configjson'
    );

    return {
      Alerts: data.sort((a, b) => b?.["_ts"] - a?.["_ts"]),
      AletDic: AletDic.a,
    };
  } catch (error) {
    console.log("error in dash getter ", error);
    return {};
  }
}

async function UpdateAlertFile(Info) {
  try {
    console.log("hello UpdateAlertFile");

    const dataraw = await GetAlertsFile();
    const data = dataraw.Alerts;
    console.log(data, "AlertsAlertsAlertsAlerts");

    let yy;
    data?.every((x, index) => {
      if (x.AlertID == Info.AlertID) {
        // x = Info;
        x.UserInput = Info.UserInput;
        console.log("hello", index);
        yy = index;
        return false;
      } else {
        console.log("bye", index);

        return true;
      }
    });
    const DashBoardFile = await path.resolve(
      __dirname,
      "..",
      "..",
      relativePath,
      "response_folder",
      "alerts.json"
    );
    const file = await fs.writeFileSync(
      DashBoardFile,
      JSON.stringify(data),
      "utf-8"
    );

    return true;
  } catch (err) {
    console.log(err, "update alerts.json gon bad");
    return false;
  }
}




async function GetSortDate() {
  try {
    const [[AletDic]] = await DBConnection.raw(
      'SELECT JSON_EXTRACT(config,"$.General.IntervalConfigurations.AlertsConfiguration.AlertSortDate") as a from configjson'
    );
    return AletDic.a
  } catch (error) {
    console.log("Error in GetSortDate : ",error);
    
  }
  
}
module.exports = { GetAlertsFile, UpdateAlertFile,GetSortDate };
