const {
  get_full_config_model,
  put_full_config_model,
  Update_mssp_config_json_links_model,
  GetAssetsModal,
  PostImportedAssets,
} = require("../models/ConfigModels");
const DBConnection = require("../db.js");
const fs = require("fs"); // Import 'fs' with Promise-based API
const path = require("path");
const os = require("os");
const axios = require("axios");
const { v4: uuid } = require("uuid");

async function Get_Config(req, res, next) {
  try {
    const file = await get_full_config_model();
    res.send(file);
  } catch (err) {
    console.log(err);
  }
}

async function Put_Config(req, res, next) {
  const config = req.body?.config;

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
async function GetAllLeakAsset(req, res, next) {
  // Work in progress
  const data = await DBConnection.raw(
    'SELECT resource_string FROM all_resources where tools like "%2001009%" or tools like "%2001011%"'
  );
  console.log("leakCheck Assets data", data);
  // res.send(data[0].map((x) => x.resource_string));

  const LeakJson = await axios.get(
    // "https://leakcheck.io/api/v2/query/"+data[0].map((x) => x.resource_string).join(", "),
    "https://leakcheck.io/api/v2/query/example@example.com",
    {
      headers: {
        Accept: "application/json",
        "X-API-Key": "d1ade9ae7283d9ed377a54718b9cd1d770cb3f49",
      },
    }
  );
  console.log("gggggggggggggggg", LeakJson);
}

async function ExportAllAssets(req, res, next) {
  try {
    console.log("start");
    const file = await GetAssetsModal();
    console.log(file);

    res.send(file);
  } catch (err) {
    console.log("Error in ExportAllAssets ", err);
  }
}

async function ImportAllAssets(req, res, next) {
  try {
    console.log("start");
    // console.log(
    //   "ttttttttttttttttttttttttttttttttttttttttttttttttttttt",
    //   req.body
    // );
    const file = await GetAssetsModal();

    const jja = req.body
      .filter((y) => {
        let bol = true;
        file.forEach((t) => {
          if (y.resource_string == t.resource_string && y.type == t.type) {
            bol = false;
            console.log("Already Exists ", y.resource_string);
          }
        });
        return bol;
      })
      .map((x) => {
        const id = uuid();
        const id_short = id.replace(/-/g, "").substring(0, 9);
        const id_with_r = "r" + id_short;
        x.resource_id = id_with_r;
        return x;
      });
    console.log(jja);
    if (jja.length > 0) {
      const r = await PostImportedAssets(jja);
      console.log(r, "response of import");
      // להיתבסס על הטקסט
      res.send("Added successfully");
    } else {
      res.send("Nothing To add As It Already Exists in the Db");
    }
  } catch (err) {
    console.log("Error in import assets ", err);
    res.send("Error");
  }
}

async function DeleteResultHistory(req, res, next) {
  try {
    console.log("start");
    const file = await get_full_config_model();
    file.RequestStatus = [];
    const f = await put_full_config_model(file);

    const relativePath = process.env.PYTHON_SCRIPTS_RELATIVE_PATH;
    const directoryPath = path.join(
      __dirname,
      "..",
      "..",
      relativePath,
      "response_folder"
    );

    const files = fs.readdirSync(directoryPath);
    console.log(files, "llllllllllllllllllllllll");
    files.forEach(async (fil) => {
      if (fil.startsWith("response_")) {
        await fs.unlinkSync(
          path.join(__dirname, "..", "..", relativePath, "response_folder", fil)
        );
      }
    });
    res.status(200).send("Delete successfully");
  } catch (error) {
    console.log("Error in Delete History", error);
    res.send("Delete Failed");
  }
}

module.exports = {
  Get_Config,
  Put_Config,
  Get_From_ENV,
  Update_mssp_config_json_links,
  ResetConfigToBasic,
  DownloadAgent,
  GetAllLeakAsset,
  ExportAllAssets,
  ImportAllAssets,
  DeleteResultHistory,
};
