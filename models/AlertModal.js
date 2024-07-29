const fs = require("fs"); // Import 'fs' with Promise-based API
const path = require("path");

async function GetAlertsFile() {
  try {
    const DashBoardFile = await path.resolve(
      __dirname,
      "..",
      "..",
      "risx-mssp-python-script",
      "response_folder",
      "alerts.json"
    );
    const file = await fs.readFileSync(DashBoardFile, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    console.log("error in dash getter", error);
    return false;
  }
}

module.exports = { GetAlertsFile };
