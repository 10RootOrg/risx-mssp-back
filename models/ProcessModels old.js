// const { error } = require('ajv/dist/vocabularies/applicator/dependencies.js')
// const { DiscrError } = require('ajv/dist/vocabularies/discriminator/types.js')

//  const config_table = "configjson"
//  const config_column = "config"
//  const fs = require('fs');  // Import 'fs' with Promise-based API
// const fs_promises = require('fs').promises; // Import 'fs' with Promise-based API
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const { spawn } = require('child_process');
const path = require('path'); 
const { exec } = require('child_process');
const DBConnection = require('../db.js')
 

async function check_main_process_status_model() {


    console.log("check_main_process_status_model");
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

// async function active_manual_process_model() {
//     console.log("active_manual_process_model");

    
//     try {
//         const pythonScriptPath = path.join('/home', 'Bacteria5570', 'mssp', 'risx-mssp-python-script', 'main.py');
    
//         const command = `bash -c "source ~/miniconda3/etc/profile.d/conda.sh && conda activate mssp_env && python ${pythonScriptPath}"`;
        
//         exec(command, (error, stdout, stderr) => {
//             if (error) {
//                 console.error(`Error: ${error.message}`);
//                 return;
//             }
    
//             if (stderr) {
//                 // console.error(`Stderr: ${stderr}`);
//             }
    
//             // console.log(`Output: ${stdout}`);
    
//             // Combine stdout and stderr for the message check
//             const combinedOutput = stdout + stderr;
    
//             if (combinedOutput.includes("Config updated successfully")) {
//                 console.log("Config updated successfully");
//                 return true
               
//             } else {
//                 console.log("Python script did not tell -- Start mssp!.");
//                 return false
//             }
//         });
//     } catch (error) {
//         console.error(`Error occurred: ${error.message}`);
//         return false;
//     }
    



    
// //   try {
// //       const EXECUTABLE = process.env.PYTHON_EXECUTABLE;
// //       const PYTHON_SCRIPTS_RELATIVE_PATH = process.env.PYTHON_SCRIPTS_RELATIVE_PATH;
// //       const PYTHON_MANUAL_ACTIVE = process.env.PYTHON_MANUAL_ACTIVE;
// //       const PYTHON_SCRIPT_PATH = path.resolve(__dirname, '..', '..', PYTHON_SCRIPTS_RELATIVE_PATH,PYTHON_MANUAL_ACTIVE);
      

 



// //       return new Promise((resolve, reject) => {
  
// //           const pythonProcess = spawn(EXECUTABLE, [PYTHON_SCRIPT_PATH]);
     
// //           pythonProcess.stdout.on('data', (data) => {
// //               console.log(`stdout: ${data.toString()}`);
// //               // Assuming success based on some condition in the output
// //               resolve(true);
// //           });

// //           pythonProcess.stderr.on('data', (data) => {
// //               console.error(`stderr: ${data.toString()}`);
// //               reject(false);
// //           });

// //           pythonProcess.on('close', (code) => {

// //             console.log(`pythonProcess.on('close', (code): `,code);
// //               if (code !== 0) {
// //                   console.log(`Child process exited with code ${code}, indicating a failure.`);
// //                   reject(false);
// //               } else {
// //                   resolve(true);
// //               }
// //           });
// //       });

// //   } catch (error) {
// //       console.error(`Error occurred: ${error.message}`);
// //       return false;
// //   }
// }


// async function active_manual_process_model() {
//     console.log("active_manual_process_model");

//     // const pythonScriptPath = path.join('/home', 'Bacteria5570', 'mssp', 'risx-mssp-python-script', 'main.py');
//       const EXECUTABLE = process.env.PYTHON_EXECUTABLE;




//       const PYTHON_SCRIPTS_RELATIVE_PATH = process.env.PYTHON_SCRIPTS_RELATIVE_PATH;
//       const PYTHON_MANUAL_ACTIVE = process.env.PYTHON_MANUAL_ACTIVE;
//       const PYTHON_SCRIPT_PATH = path.resolve(__dirname, '..', '..', PYTHON_SCRIPTS_RELATIVE_PATH,PYTHON_MANUAL_ACTIVE);

//     const command = `bash -c "source ~/miniconda3/etc/profile.d/conda.sh && conda activate mssp_env && python ${PYTHON_SCRIPT_PATH}"`;


//     // export PATH="~/miniconda3/bin:~/mssp/risx-mssp-python-script/mssp_env/bin:$PATH"
//     // source ~/mssp/risx-mssp-python-script/mssp_env/bin/activate
//     // conda activate mssp_e


//     return new Promise((resolve, reject) => {
//         exec(command, (error, stdout, stderr) => {
//             if (error) {
//                 console.error(`Error: ${error.message}`);
//                 reject(false); // Reject with false indicating failure
//                 return;
//             }

//             // Combine stdout and stderr for the message check
//             const combinedOutput = stdout + stderr;

//             if (combinedOutput.includes("Config updated successfully")) {
//                 resolve(true); // Resolve with true indicating success
//             } else {
//                 console.log("Python script did not indicate success.");
//                 resolve(false); // Resolve with false indicating failure
//             }
//         });
//     });
// }
async function active_manual_process_model() {
    const PYTHON_SCRIPTS_RELATIVE_PATH = process.env.PYTHON_SCRIPTS_RELATIVE_PATH;
    const PYTHON_MANUAL_ACTIVE = process.env.PYTHON_MANUAL_ACTIVE;
    const PYTHON_SCRIPT_PATH = path.resolve(__dirname, '..', '..', PYTHON_SCRIPTS_RELATIVE_PATH, PYTHON_MANUAL_ACTIVE);



    console.log("PYTHON_SCRIPT_PATH", PYTHON_SCRIPT_PATH);
    const command2 = `
        export PATH="~/mssp/risx-mssp-python-script/mssp_env/bin:$PATH" && \
        python ${PYTHON_SCRIPT_PATH}
    `;

    const command = `
    source ~/miniconda3/etc/profile.d/conda.sh && \
    conda activate mssp_env && \
    python ${PYTHON_SCRIPT_PATH}
`;
    
    return new Promise((resolve, reject) => {
        exec(command, { shell: '/bin/bash' }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject(false); // Reject with false indicating failure
                return;
            }

            // Combine stdout and stderr for the message check
            const combinedOutput = stdout + stderr;

            if (combinedOutput.includes("Config updated successfully")) {
                resolve(true); // Resolve with true indicating success
            } else {
                console.log("Python script did not indicate success.");
                resolve(false); // Resolve with false indicating failure
            }
        });
    });
}

module.exports = {  check_main_process_status_model , active_manual_process_model};
