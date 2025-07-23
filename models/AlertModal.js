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
    console.error("error in dash getter ", error);
    return {};
  }
}

async function UpdateAlertFile(Info) {
  try {
    console.log("hello UpdateAlertFile");

    const dataRaw = await GetAlertsFile();
    const data = dataRaw.Alerts;
    console.log(data, "AlertsAlertsAlertsAlerts");

    // let yy;
    data?.every((x, index) => {
      if (x.AlertID == Info.AlertID) {
        // x = Info;
        x.UserInput = Info.UserInput;
        console.log("hello", index);
        // yy = index;
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
    console.error(err, "update alerts.json gon bad");
    return false;
  }
}
async function UpdateAlertFileMany(Info) {
  try {
    console.log("hello UpdateAlertFileMany");

    const dataRaw = await GetAlertsFile();
    const data = dataRaw.Alerts;
    // console.log(data, "AlertsAlertsAlertsAlerts");
    const DateUpdateYES = new Date();
    // let yy;
    data?.forEach((x, index) => {
      console.log(index, Info.AlertIDs.includes(x.AlertID));

      if (Info.AlertIDs.includes(x.AlertID)) {
        // x = Info;
        x.UserInput = {
          UserId: Info.User ?? "",
          Status: "Unreviewed",
          ChangedAt: DateUpdateYES,
        };
        console.log("hello", index);
        // yy = index;
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
    console.error(err, "update alerts.json gon bad");
    return false;
  }
}

async function GetSortDate() {
  try {
    const [[AletDic]] = await DBConnection.raw(
      'SELECT JSON_EXTRACT(config,"$.General.IntervalConfigurations.AlertsConfiguration.AlertSortDate") as a from configjson'
    );
    return AletDic.a;
  } catch (error) {
    console.error("Error in GetSortDate : ", error);
  }
}

async function GetSortDateBool(bool) {
  try {
    const quer = `SELECT JSON_EXTRACT(config,'$.General.AlertDictionary.${'"Python.Suspicious.File.Found"'}.Log') as a from configjson`;
    const [[AletDic2]] = await DBConnection.raw(quer);
    console.log(quer, "AletDic2AletDic2AletDic2AletDic2AletDic2", AletDic2);

    const AletDic = await DBConnection.raw(
      `UPDATE configjson SET config = JSON_SET(config,'$.General.AlertDictionary.${'"Python.Suspicious.File.Found"'}.Log', ${
        bool ? "true" : "false"
      })`
    );
    console.log(
      "AletDicAletDicAletDicAletDic",
      AletDic,
      "jhijbkjhjh",
      `UPDATE configjson SET config = JSON_SET(config,'$.General.AlertDictionary.${'"Python.Suspicious.File.Found"'}.Log', ${
        bool ? "true" : "false"
      })`
    );

    return true;
  } catch (error) {
    console.error("Error in GetSortDate : ", error);
  }
}

async function GetAlertsConfigMod(id) {
  try {
    const [AletDic] = await DBConnection.raw(
      'SELECT label as value,label as preview_name FROM alert_client_config where not label = "all_monitor"'
    );
    console.log("AletDicAletDicAletDicAletDicAletDicAletDic", AletDic);
    const query = id ? `and label = "${id}"` : "";
    const [[AletDic1]] = await DBConnection.raw(
      `SELECT * FROM mssp.alert_client_config where not label = "all_monitor"  ${query} limit 1`
    );
    console.log(
      "AletDic1AletDic1AletDic1AletDic1AletDic1AletDic1AletDic1",
      AletDic1
    );

    return { Menu: AletDic, AlertConfig: AletDic1 };
  } catch (error) {
    console.error("Error in GetAlertsConfigMod : ", error);
  }
}

async function UpdateAlertConfigMod(id, aConfig) {
  try {
    const stringified = JSON.stringify(aConfig);
    const ResUpdate = await DBConnection("alert_client_config")
      .update({
        config: stringified,
      })
      .where("label", id);
    console.log("AletDicAletDicAletDicAletDicAletDicAletDic", ResUpdate);

    return ResUpdate;
  } catch (error) {
    console.error("Error in UpdateAlertConfigMod : ", error);
  }
}

async function GetAllAlertsMonitorMod() {
  try {
    const [[AletDic]] = await DBConnection.raw(
      'SELECT * FROM alert_client_config where  label = "all_monitor"'
    );
    console.log("AletDicAletDicAletDicAletDicAletDicAletDic", AletDic);

    return AletDic;
  } catch (error) {
    console.error("Error in GetAlertsConfigMod : ", error);
  }
}

async function ClearAlertDataChangeMod() {
  try {
    const timeEpoch = Date.now();
    const IsoTime = new Date(timeEpoch).toISOString();
    console.log("this is date ", timeEpoch, IsoTime);

    const AletDic = await DBConnection.raw(
      `UPDATE configjson SET config = JSON_SET(config,'$.General.IntervalConfigurations.AlertsConfiguration.AlertSortDate', '${IsoTime}','$.General.IntervalConfigurations.AlertsConfiguration.LastTimeStampInterval','${timeEpoch}')`
    );
    console.log("AletDicAletDicAletDicAletDicAletDicAletDic", AletDic);

    return true;
  } catch (error) {
    console.error("Error in ClearAlertDataChangeMod : ", error);
    return false;
  }
}

module.exports = {
  ClearAlertDataChangeMod,
  GetAllAlertsMonitorMod,
  UpdateAlertConfigMod,
  GetAlertsConfigMod,
  GetAlertsFile,
  UpdateAlertFile,
  GetSortDate,
  GetSortDateBool,
  UpdateAlertFileMany,
};
