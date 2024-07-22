const fs = require("fs"); // Import 'fs' with Promise-based API

async function GetDashFile(pathToFile) {
  try {
    const file = await fs.readFileSync(pathToFile, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    console.log("error in dash getter", error);
    return false;
  }
}

module.exports = { GetDashFile };
