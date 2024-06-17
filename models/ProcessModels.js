// const { error } = require('ajv/dist/vocabularies/applicator/dependencies.js')
// const { DiscrError } = require('ajv/dist/vocabularies/discriminator/types.js')

//  const config_table = "configjson"
//  const config_column = "config"
//  const fs = require('fs');  // Import 'fs' with Promise-based API
// const fs_promises = require('fs').promises; // Import 'fs' with Promise-based API
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const  path = require('path');
const { spawn } = require('child_process');
const { exec } = require('child_process');
const DBConnection = require('../db.js')
 

async function check_main_process_status_model() {
  const file_name = process.env.PYTHON_INTERVAL;

  try {
      const isRunning = await new Promise((resolve, reject) => {
          const command = `ps aux | grep '[p]ython'`;

          exec(command, (error, stdout, stderr) => {
              if (error) {
                  console.error(`Error executing command: ${error.message}`);
                  reject(false);
                  return;
              }

              if (stderr) {
                  console.error(`Error: ${stderr}`);
                  reject(false);
                  return;
              }

              // Check if any line contains the file name
              const lines = stdout.trim().split('\n');
              let isRunning = false;

              for (let line of lines) {
                  if (line.includes(file_name)) {
                      isRunning = true;
                      break;
                  }
              }

              if (isRunning) {
                  console.log(`${file_name} is running`);
                  resolve(true);
              } else {
                  console.log(`${file_name} is not running`);
                  resolve(false);
              }
          });
      });

      return isRunning;
  } catch (error) {
      console.error('Error checking process status:', error);
      return false;
  }
}

async function active_manual_process_model() {
    console.log("active_manual_process_model");
  try {
      const EXECUTABLE = process.env.PYTHON_EXECUTABLE;
      const PYTHON_SCRIPTS_RELATIVE_PATH = process.env.PYTHON_SCRIPTS_RELATIVE_PATH;
      const PYTHON_MANUAL_ACTIVE = process.env.PYTHON_MANUAL_ACTIVE;
      const PYTHON_SCRIPT_PATH = path.resolve(__dirname, '..', '..', PYTHON_SCRIPTS_RELATIVE_PATH,PYTHON_MANUAL_ACTIVE);
      
 

      return new Promise((resolve, reject) => {
  
          const pythonProcess = spawn(EXECUTABLE, [PYTHON_SCRIPT_PATH]);
     
          pythonProcess.stdout.on('data', (data) => {
              console.log(`stdout: ${data.toString()}`);
              // Assuming success based on some condition in the output
              resolve(true);
          });

          pythonProcess.stderr.on('data', (data) => {
              console.error(`stderr: ${data.toString()}`);
              reject(false);
          });

          pythonProcess.on('close', (code) => {
              if (code !== 0) {
                  console.log(`Child process exited with code ${code}, indicating a failure.`);
                  reject(false);
              } else {
                  resolve(true);
              }
          });
      });

  } catch (error) {
      console.error(`Error occurred: ${error.message}`);
      return false;
  }
}

module.exports = {  check_main_process_status_model , active_manual_process_model};
