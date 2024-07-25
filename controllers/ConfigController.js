const {
  get_full_config_model,
  put_full_config_model,
  Update_mssp_config_json_links_model,
} = require("../models/ConfigModels");
const DBConnection = require("../db.js");
const fs = require("fs"); // Import 'fs' with Promise-based API
const path = require("path");
const os = require("os");

async function Get_Config(req, res, next) {
  try {
    const file = await get_full_config_model();
    res.send(file);
  } catch (err) {
    console.log(err);
  }
}

async function Put_Config(req, res, next) {
  const config = req.body.config;

  try {
    const put = await put_full_config_model(config);
    console.log("put", put);

    if (put === 1) {
      res.status(200).send("Updated successfully");
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function Get_From_ENV(req, res, next) {
  let data = {
    FRONT_IP: "",
    FRONT_URL: "",
    other: "",
  };

  try {
    const FRONT_IP = process.env.FRONT_IP;
    const FRONT_URL = process.env.FRONT_URL;

    data = {
      FRONT_IP: FRONT_IP,
      FRONT_URL: FRONT_URL,
      other: "",
    };

    res.send(data);
  } catch (err) {
    console.log(err);
  }
}

async function Update_mssp_config_json_links(req, res, next) {
  const body = req.body;
  if (body === undefined) {
    console.log("Update_mssp_config_json_links", body);
    return;
  }

  try {
    const put = await Update_mssp_config_json_links_model(body);
    if (put === true) {
      res.status(200).send("mssp_config.json updated successfully.");
    } else {
      res.status(500).send("Error updating mssp_config.json:");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

const ResetConfigToBasic = async (req, res, next) => {
  console.log("ResetConfigToBasic boom");
  const filePath = path.join(
    __dirname,
    "..",
    "db",
    "seeds",
    "production",
    "config_seed.json"
  );
  console.log("filePath 55555", filePath);

  const BasicConfig = JSON.parse(fs.readFileSync(filePath, "utf8"));
  console.log("BasicConfig 8893852", BasicConfig);

  const put = await put_full_config_model(BasicConfig);
  if (put === 1) {
    res.status(200).send("Updated successfully");
  } else {
    res.status(500).send("Internal Server Error");
  }
};

async function DownloadAgent(req, res, next) {
  console.log("req.body req.body req.body", req?.body);
  const { PathOs } = req?.body;
  // console.log(os.homedir()+"\\setup_platform\\scripts\\velociraptor-docker\\velociraptor\\client\\windows\\velociraptor_client.msi");
  const url = os.homedir() + PathOs.replace("~", "");
  console.log(url);
  const exist = await fs.existsSync(url);
  console.log(
    exist,
    "ooooooooooooooooooooooooooooooooossssssssssssssssssssssssss"
  );
  if (exist) {
    res.download(url);
  } else {
    res.status(401).send({ error: "no such file" });
  }
}
// DownloadAgent()
module.exports = {
  Get_Config,
  Put_Config,
  Get_From_ENV,
  Update_mssp_config_json_links,
  ResetConfigToBasic,
  DownloadAgent,
};
