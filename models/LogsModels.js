const { error } = require('ajv/dist/vocabularies/applicator/dependencies.js')
const DBConnection = require('../db.js')
const { DiscrError } = require('ajv/dist/vocabularies/discriminator/types.js')
const { exec } = require('child_process');
 
 const fs = require('fs');
 const fs_promises = require('fs').promises; // Import 'fs' with Promise-based API
  const  path = require('path');

 
 
async function get_log_model(logName,fileName) {

let log_file_name = fileName
let log_File_Path = ""

 try {

switch(logName) {

  case "log_mssp_backend":   
  console.log("log_mssp_backend");
 
  log_File_Path = path.resolve(__dirname, '..', '..','risx-mssp-back',log_file_name)
  break;
  
 
  case "log_python_interval":   
  console.log("interval.log");
 
  log_File_Path = path.resolve(__dirname, '..', '..','risx-mssp-python-script','logs',log_file_name)
  break;


  
  case "log_python_main":   
  console.log("main.log");
 
  log_File_Path = path.resolve(__dirname, '..', '..','risx-mssp-python-script','logs',log_file_name)
  break;


  default:
return   `log file name: ${logName} is not recognize` 
  break;
  
          }  
  
// if (process.env.NODE_ENV === 'development') {
//   path_to_mssp_config_json = path.join(__dirname, '..', '..', 'risx-mssp-front', `public`, mssp_config_json);

// } else if (process.env.NODE_ENV === 'production') {
//   path_to_mssp_config_json = path.join(__dirname, '..', '..', 'risx-mssp-front-build', mssp_config_json);
// }






  // Check if the file exists
    // Check if the file exists
    const fileExists = await new Promise((resolve) => {
      fs.access(log_File_Path, fs.constants.F_OK, (err) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });

    if (!fileExists) {
      return { status: 404, message: 'Log file not found' };
    }

    // Read file contents
    const log_content = await new Promise((resolve, reject) => {
      fs.readFile(log_File_Path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return { status: 200, content: log_content };
  } catch (error) {
    return { status: 500, message: `Error: ${error.message}` };
  }




 
} 
 
module.exports = { get_log_model};
