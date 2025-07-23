const path = require("path");
const {
  GetDashFile,
  GetClientName,
  ClearResultsDataDashboardMod,
} = require("../models/DashboardModals");
const {
  UpdateTimeSketchTagsInConfigModal,
  get_full_config_model,
  ClearTimeSketchTagsInConfigModal,
} = require("../models/ConfigModels");
const relativePath = process.env.PYTHON_SCRIPTS_RELATIVE_PATH;
async function GetDashBoardFile(req, res, next) {
  try {
    console.log("req.params req.params req.params", req.params);
    const DashBoardFile = await path.resolve(
      __dirname,
      "..",
      "..",
      relativePath,
      "response_folder",
      "dashboard.json"
    );
    console.log("DashBoardFile", DashBoardFile);

    const file = await GetDashFile(DashBoardFile);
    if (file) {
      switch (req.params.DashBoardName) {
        case "Forensics":
          console.log("Start Forensics DashBoard");

          const configFull = await get_full_config_model();

          console.log();

          configFull?.General?.IntervalConfigurations?.DashBoardsConfiguration?.TimeSketchIgnoreTagsList?.forEach(
            (tg) => delete file.TimeSketch.tag_counts[tg]
          );
          console.log("Pre Send Forensics DashBoard", file.TimeSketch);

          res.send({
            Velociraptor: file.Velociraptor,
            TimeSketch: file.TimeSketch,
          });

          break;
        case "CTI":
          res.send({
            Misp: file.Misp,
            LeakCheck: file.DashboardsFromResponses.LeakCheck || [],
          });

          break;
        default:
          res.send(file);
          break;
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function GetDashBoardClientIdVelo(req, res, next) {
  try {
    const { id } = req.params;
    // SELECT * from all_resources where parent_id like "%ec147bd2-83d1-11ef-869a-000d3a684dce%" and type = 2008
    const name = await GetClientName(id);
    console.log("name name name", name);

    const ClientDict = await path.resolve(
      __dirname,
      "..",
      "..",
      relativePath,
      "response_folder",
      "velociraptor_clients.json"
    );
    console.log("ClientDict", ClientDict);

    const file = await GetDashFile(ClientDict);
    console.log(file);
    console.log(
      file[name[0]?.resource_string] ?? name[0]?.resource_string ?? false,
      "result send"
    );

    res.send(file[name[0]?.resource_string] ?? false);
  } catch (error) {
    console.error("error in GetDashBoardClientIdVelo :", error);
  }
}

async function ClearResultsDataDashboard(req, res, next) {
  try {
    console.log("start ClearResultsDataDashboard");
    const rer = await ClearResultsDataDashboardMod();
    res.send(rer);
  } catch (error) {
    console.error("Error in ClearResultsDataDashboard: ", error);
  }
}

async function UpdateTimeSketchTagsInConfig(req, res, next) {
  try {
    console.log(
      "start UpdateTimeSketchTagsInConfig",
      req.body.tagName,
      req.body
    );
    const rer = await UpdateTimeSketchTagsInConfigModal(req.body.tagName);
    res.send(rer);
  } catch (error) {
    console.error("Error in UpdateTimeSketchTagsInConfig: ", error);
  }
}
async function ClearTimeSketchTagsInConfig(req, res, next) {
  try {
    console.log(
      "start ClearTimeSketchTagsInConfig",
      req.body
    );
    const rer = await ClearTimeSketchTagsInConfigModal();
    res.send(rer);
  } catch (error) {
    console.error("Error in ClearTimeSketchTagsInConfig: ", error);
  }
}
module.exports = {
  GetDashBoardFile,
  GetDashBoardClientIdVelo,
  ClearResultsDataDashboard,
  UpdateTimeSketchTagsInConfig,
  ClearTimeSketchTagsInConfig,
};
