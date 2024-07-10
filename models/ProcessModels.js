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
const DBConnection = require('../db.js');
const { log } = require('console');
 

async function check_main_process_status_model() {
  const file_name = process.env.PYTHON_INTERVAL;
console.log("file_name", file_name);
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
     console.log("check_main_process_status_model - line", line);

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

async function active_interval_process_model() {
 console.log("----- active_interval_process_model ------------");

    // const PYTHON_MANUAL_ACTIVE = process.env.PYTHON_MANUAL_ACTIVE;
    // const PYTHON_SCRIPT_PATH = path.resolve(__dirname, '..', '..', PYTHON_SCRIPTS_RELATIVE_PATH, PYTHON_MANUAL_ACTIVE);
    // const PYTHON_EXECUTABLE = path.resolve(__dirname, '..', '..', PYTHON_SCRIPTS_RELATIVE_PATH,  'mssp_env', 'bin', 'python3');
    // const RELATIVE = path.resolve(__dirname, '..', '..');

const SCRIPTS_FOLDER = process.env.PYTHON_SCRIPTS_RELATIVE_PATH;
const PYTHON_ENVIRONMENT = path.resolve(__dirname, '..', '..', SCRIPTS_FOLDER,  'mssp_env', 'bin' , 'activate')
// const SCRIPTS_PATH = path.resolve(__dirname, '..', '..', SCRIPTS_FOLDER,  'modules', 'Velociraptor')
const SCRIPTS_PATH = path.resolve(__dirname, '..', '..', SCRIPTS_FOLDER)


const PYTHON_EXECUTABLE  = process.env.PYTHON_EXECUTABLE;
const PYTHON_INTERVAL_FILENAME = process.env.PYTHON_INTERVAL;

const command = `
source ${PYTHON_ENVIRONMENT} && \
${PYTHON_EXECUTABLE} ${SCRIPTS_PATH}/${PYTHON_INTERVAL_FILENAME}
`;

 
//     const command = `
//     source ~/mssp/risx-mssp-python-script/mssp_env/bin/activate  && \
//     python  ~/mssp/risx-mssp-python-script/modules/Velociraptor/VelociraptorInterval.py
// `;

 try{

    return new Promise((resolve, reject) => {
        const process = exec(command, { shell: '/bin/bash' }, (error, stdout, stderr) => {

            console.log("active_interval_process - Promise");

            if (error) {
                console.log("active_interval_process - return new Promise error");
                // console.error(`Error: ${error.message}`);
                // console.log(`stderr: ${stderr}`);
                reject(false); // Reject with false indicating failure
                return error;
            }
            
            if (stdout.includes("Start interval loop")) {
                console.log("active_interval_process - Start interval loop");
                // console.log("stdout.includes(Start mssp):", stdout);
                resolve(true); // Resolve with true indicating success
            } else {
                console.log("active_interval_process - Python script did not indicate success.");
                // console.log(`stdout: ${stdout}`);
                // console.log(`stderr: ${stderr}`);
                resolve(false); // Resolve with false indicating failure
            }
        });

        
        // Start interval loop
        process.stdout.on('data', (data) => {
            if(data.includes("Start interval loop")){ 
                //  console.log(`yeaaa in process: `)
                  resolve(true);
                 ;}
                // Resolve with true indicating success
        });

        // process.stderr.on('data', (data) => {
        //     console.error(`stderr: ${data}`);
        // });




    });

}catch (error) {
    console.error('active_interval_process - Error active_interval_process_model', error);
    return false;
}


}
 

async function active_manual_process_model() {
    console.log("active_manual_process_model 777");
try{
    const PYTHON_SCRIPTS_RELATIVE_PATH = process.env.PYTHON_SCRIPTS_RELATIVE_PATH;
    const PYTHON_MANUAL_ACTIVE = process.env.PYTHON_MANUAL_ACTIVE;
    const RELATIVE_PATH = path.resolve(__dirname, '..', '..');
    const PYTHON_SCRIPT_PATH = path.resolve(RELATIVE_PATH, PYTHON_SCRIPTS_RELATIVE_PATH, PYTHON_MANUAL_ACTIVE);
    // const PYTHON_EXECUTABLE = path.resolve(RELATIVE_PATH, PYTHON_SCRIPTS_RELATIVE_PATH, 'mssp_env', 'bin', 'python');

    const PYTHON_EXECUTABLE = process.env.PYTHON_EXECUTABLE;
    


    const command = `source ~/mssp/risx-mssp-python-script/mssp_env/bin/activate && ${PYTHON_EXECUTABLE}`;
    const args = [PYTHON_SCRIPT_PATH];

    console.log("command", command);
    console.log("args", args);

    return new Promise((resolve, reject) => {
        const childProcess = spawn(command, args, {
            shell: '/bin/bash',
            env: { ...process.env },
        });

        let found = false;

        childProcess.stdout.on('data', (data) => {
            if (data.toString().includes("Start mssp")) {
                found = true;
                console.log("stdout.includes(Start mssp)");
                resolve(true); // Resolve with true indicating success
                // Do not kill the process, let it continue running
            }
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        childProcess.on('close', (code) => {
            if (!found) {
                console.log("Process closed with code:", code);
                if (code !== 0) {
                    console.error(`Process exited with code ${code}`);
                }
                resolve(false); // Resolve with false indicating failure
            }
        });

        childProcess.on('error', (error) => {
            console.error(`Error: ${error.message}`);
            reject(false); // Reject with false indicating failure
        });
    });
}
catch (error) {
    console.error('Error active_interval_process_model', error);
    return false;
}


}


function search_And_Kill_Process(processName) {


    console.log("kill-interval-of-python",processName);
    return new Promise((resolve, reject) => {
        exec(`ps aux | grep ${processName} | grep -v grep`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error searching for process: ${err}`);
                return reject(err);
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return reject(stderr);
            }

            if (!stdout) {
                console.log('No such process found.');
                return resolve(false);
            }

            const processLines = stdout.split('\n').filter(line => line.includes(processName));
            const pids = processLines.map(line => line.trim().split(/\s+/)[1]);

            if (pids.length === 0) {
                console.log('No matching processes found.');
                return resolve(false);
            }

            let killPromises = pids.map(pid => {
                return new Promise((resolve, reject) => {
                    exec(`kill ${pid}`, (err, stdout, stderr) => {
                        if (err) {
                            console.error(`Error killing process ${pid}: ${err}`);
                            return reject(err);
                        }

                        if (stderr) {
                            console.error(`stderr: ${stderr}`);
                            return reject(stderr);
                        }

                        console.log(`Process ${pid} killed successfully.`);
                        resolve(true);
                    });
                });
            });

            Promise.all(killPromises)
                .then(() => resolve(true))
                .catch(err => reject(err));
        });
    });
}

module.exports = {
check_main_process_status_model ,
active_manual_process_model,
active_interval_process_model,
search_And_Kill_Process
};







    // const command2 = `
    //     source ~/mssp/risx-mssp-python-script/mssp_env/bin/activate  && \
    //     python  ~/mssp/risx-mssp-python-script/main.py
    // `;

    // console.log("command0",command);
    // console.log("command2",command2);

    // const command = `
    //     source ~/mssp/risx-mssp-python-script/mssp_env/bin/activate  && \
    //     python  ~/mssp/risx-mssp-python-script/modules/Velociraptor/VelociraptorInterval.py
    // `;


// const command = `
// export PATH="${RELATIVE}/${PYTHON_SCRIPTS_RELATIVE_PATH}/mssp_env/bin:$PATH" && \
// ${PYTHON_EXECUTABLE} ${PYTHON_SCRIPT_PATH}
// `;







// async function active_manual_process_model() {
//     console.log("active_manual_process_model");

//     const PYTHON_SCRIPTS_RELATIVE_PATH = process.env.PYTHON_SCRIPTS_RELATIVE_PATH;
//     const PYTHON_MANUAL_ACTIVE = process.env.PYTHON_MANUAL_ACTIVE;
//     const PYTHON_SCRIPT_PATH = path.resolve(__dirname, '..', '..', PYTHON_SCRIPTS_RELATIVE_PATH, PYTHON_MANUAL_ACTIVE);
//     const PYTHON_EXECUTABLE = path.resolve(__dirname, '..', '..', PYTHON_SCRIPTS_RELATIVE_PATH,  'mssp_env', 'bin', 'python3');

//     const RELATIVE = path.resolve(__dirname, '..', '..');

// // const command = `
// // export PATH="/home/Bacteria5570/mssp/risx-mssp-python-script/mssp_env/bin:$PATH" && \
// // ${PYTHON_EXECUTABLE} ${PYTHON_SCRIPT_PATH}
// // `;

//     const command = `
//         export PATH="${RELATIVE}/${PYTHON_SCRIPTS_RELATIVE_PATH}/mssp_env/bin:$PATH" && \
//         ${PYTHON_EXECUTABLE} ${PYTHON_SCRIPT_PATH}
//     `;

//     return new Promise((resolve, reject) => {
//         exec(command, { shell: '/bin/bash' }, (error, stdout, stderr) => {
//             console.log("stdout:", stdout);
//             console.log("stderr:", stderr);

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



// const command = `
// export PATH="/home/Bacteria5570/mssp/risx-mssp-python-script/mssp_env/bin:$PATH" && \
// ${PYTHON_EXECUTABLE} ${PYTHON_SCRIPT_PATH}
// `;
// const command = `
// export PATH="${RELATIVE}/${PYTHON_SCRIPTS_RELATIVE_PATH}/mssp_env/bin:$PATH" && \
// ${PYTHON_EXECUTABLE} ${PYTHON_SCRIPT_PATH}
// `;

//  source ~/mssp/risx-mssp-python-script/mssp_env/bin/activate 
//   python main.py

// async function active_manual_process_model() {

