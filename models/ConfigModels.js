const { error } = require("ajv/dist/vocabularies/applicator/dependencies.js");
const DBConnection = require("../db.js");
const { DiscrError } = require("ajv/dist/vocabularies/discriminator/types.js");
const { exec } = require("child_process");
const config_table = "configjson";
const fs = require("fs");
const fs_promises = require("fs").promises; // Import 'fs' with Promise-based API
const path = require("path");

const config_column = "config";

async function put_full_config_model(config) {
  console.log("put_full_config_model");

  if (config === undefined || config === null) {
    console.log("config file is,", config);
    return "Error in Put config file";
  }

  try {
    const stringified = JSON.stringify(config);
    const change_this = await DBConnection(config_table)
      .update({ config: stringified })
      .limit(1); //   first row
    console.log("change_this sssssssss", change_this);

    // const stringified =  JSON.stringify( real_config)
    //     const change_this = await DBConnection('configjson')
    //     .update({ config:stringified})
    //     .limit(1); //   first row
    //  console.log(change_this);

    // const [Nuclei] = await DBConnection.raw('SELECT JSON_EXTRACT(config,"$.Modules.Nuclei") as data FROM configjson;');
    // console.log("ddddssssssssssssssssss Nuclei"  , Nuclei[0].data);
    // const [ReqestStatus] = await DBConnection.raw('SELECT JSON_EXTRACT(config,"$.ReqestStatus") as data FROM configjson;');
    //  console.log("ReqestStatus ReqestStatus"  , ReqestStatus[0] );

    return change_this;
  } catch (err) {
    const error_m = {
      error: "failed saving config",
      DiscrError: [err],
    };
    console.error("Error find get_full_config_model:", err);
    return error_m;
  }
}

async function get_full_config_model() {
  try {
    const [the_config_json] = await DBConnection(config_table).select(
      config_column
    );
    // console.log("the_config_json  "  , the_config_json);
    // console.log("the_config_json  "  , the_config_json.config.Modules.Nuclei);
    // const [Nuclei] = await DBConnection.raw('SELECT JSON_EXTRACT(config,"$.Modules.Nuclei") as data FROM configjson;');
    // console.log("ddddssssssssssssssssss Nuclei"  , Nuclei[0].data);

    // const [ReqestStatus] = await DBConnection.raw('SELECT JSON_EXTRACT(config,"$.ReqestStatus") as data FROM configjson;');
    //  console.log("ReqestStatus ReqestStatus"  , ReqestStatus[0] );

    return the_config_json.config;
  } catch (err) {
    const error_m = {
      error: "Error find get_full_config_model",
      DiscrError: [err],
    };
    console.error("Error find get_full_config_model:", err);
    return error_m;
  }
}

async function Update_mssp_config_json_links_model(body) {
  if (!body) {
    console.log("config file is,", body);
    return "Error in Put body file: Body is undefined or null";
  }

  try {
    let path_to_mssp_config_json = "";
    const mssp_config_json = "mssp_config.json";

    if (process.env.NODE_ENV === "development") {
      path_to_mssp_config_json = path.join(
        __dirname,
        "..",
        "..",
        "risx-mssp-front",
        `public`,
        mssp_config_json
      );
    } else if (process.env.NODE_ENV === "production") {
      path_to_mssp_config_json = path.join(
        __dirname,
        "..",
        "..",
        "risx-mssp-front-build",
        mssp_config_json
      );
    }

    if (!path_to_mssp_config_json) {
      console.error("Path to mssp_config.json is undefined.");
      return "Error: Path to mssp_config.json is undefined.";
    }

    const data = await fs_promises.readFile(path_to_mssp_config_json, "utf8");

    const config = JSON.parse(data);
    // Update moduleLinks in the config object
    config.moduleLinks = body;

    // Write the updated JSON back to mssp_config.json
    await fs_promises.writeFile(
      path_to_mssp_config_json,
      JSON.stringify(config, null, 2)
    );
    console.log("mssp_config.json updated successfully.");

    return true;
  } catch (error) {
    console.error("Error updating mssp_config.json:", error);
    return false;
  }
}

module.exports = {
  get_full_config_model,
  put_full_config_model,
  Update_mssp_config_json_links_model,
};
