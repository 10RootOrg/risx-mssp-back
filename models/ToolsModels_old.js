// const DatabaseError = require('../errors/DatabaseError');
const { log } = require('console');
const fs = require('fs');
 const  path = require('path');
  const pathToTmpJson  = path.resolve(__dirname,'../tmpjsons/ResourceGroup-websites.json')
  const DBConnection = require('../db.js')
  const { exec } = require('child_process');
  const { spawn } = require('child_process');

  const util = require('util');
  const execPromisify = util.promisify(exec);


 


async function make_JSON_velociraptor_Artifact___kitty() {

  try {
    const toolData = {
      action: "runartifact",
      artifactname: "Exchange.Windows.HardeningKitty",
      arguments: "TakeBackUp= 'N', Baseline= 'finding_list_0x6d69636b_machine'",
      expiretime: "30",
      organizationid: "OCHL0",
      label: "iris"
  }
  
  
const formattedDate = await get_Date_and_hour_string();
const directoryPath = path.join(__dirname, '..', 'active_tool_log');
const toolDataJSON = JSON.stringify(toolData);
const FileName = `request_velociraptor_${formattedDate}.json`

  const filePath = path.join(directoryPath, FileName);
  // console.log("filePath" , filePath);
 
    fs.writeFile(filePath, toolDataJSON, (err) => {
      if (err) {
        // Handle possible errors in file writing
        console.error('Error writing file:', err);
      } else {
        console.log('File written successfully');

      }

      


    });

    return filePath
  } catch (err) {
  
  }



  
}
 

async function get_Date_and_hour_string() {
 
 
  try {
 
  // Format the date components
  const date = new Date
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
  const year = String(date.getFullYear()).slice(2); // Get the last two digits of the year
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  // Combine the components into the desired format
  const formattedDate = `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;
  

  return formattedDate


    
  } catch (err) {
  console.log(err);
  return err
  }



  
}
 
async function active_velociraptor_JSON_in_py(file_Path_and_Name){
  // try{
console.log();
const python_script_path =`C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\main.py`
const python_exe_path =`C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\mssp_env\\python.exe`




const command = `${python_exe_path} ${python_script_path} ${file_Path_and_Name}`;
// const command1 = 'C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\mssp_env\\python.exe C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\main.py C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\JsonExamples\\request_velociraptor_01-04-2024-11-19-00[Hayabusa]'

// const command2 = 'C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\mssp_env\\python.exe C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\main.py C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\JsonExamples\\front_velociraptor_01-04-2024-11-19-00[Hayabusa].json'
// const command3 = 'C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\mssp_env\\python.exe C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\main.py "C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\JsonExamples\\request_velociraptor_01-04-2024-11-19-00[Hayabusa]"'
// const command4 = 'C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\mssp_env\\python.exe   C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\main.py  C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\JsonExamples\\front_velociraptor_01-04-2024-11-19-00[Hayabusa].json'
// const command5 = '"C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\mssp_env\\python.exe"   "C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\main.py"  "C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\JsonExamples\\front_velociraptor_01-04-2024-11-19-00[Hayabusa].json"'
// const command6 = 'echo Hello World';
// const command7 = 'C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\mssp_env\\python.exe   C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\test_alon.py'
// const command8 = 'C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\mssp_env\\python.exe   C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\test_alon2.py   "C:/Users/10root/Desktop/10root/mssp/risx-mssp-python-script/jsonexamples/request_velociraptor_hayabusa.json".py'
// const command10= '"C:/Users/10root/Desktop/10root/mssp/risx-mssp-python-script/mssp_env/python.exe" "C:/Users/10root/Desktop/10root/mssp/risx-mssp-python-script/main.py" "C:/Users/10root/Desktop/10root/mssp/risx-mssp-python-script/jsonexamples/request_velociraptor_hayabusa.json"'
// const command11 = `"C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\mssp_env\\python.exe" "C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\main.py" "C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\jsonexamples\\request_velociraptor_hayabusa.json"`
// const comcommand1000000 ='C:\Users\10root\Desktop\10root\mssp\risx-mssp-python-script\mssp_env\python.exe   C:\Users\10root\Desktop\10root\mssp\risx-mssp-python-script\main.py C:\Users\10root\Desktop\10root\mssp\risx-mssp-python-script\jsonexamples\request_velociraptor_hayabusa.json'



try {
  // Path to Python interpreter
  const pythonPath = 'C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\mssp_env\\python.exe';

  // Path to Python script file
  const pythonScriptPath = 'C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\main.py';

  // Data to pass to Python script
  const dataToSend = "C:\\Users\\10root\\Desktop\\10root\\mssp\\risx-mssp-python-script\\jsonexamples\\request_velociraptor_hayabusa.json";

  // Spawn a Python process
  const pythonProcess = spawn(pythonPath, [pythonScriptPath, dataToSend] );




  
  // Handle asynchronous error event
  pythonProcess.on('error', (err) => {
    console.error(`Failed to start Python process: ${err.message}`);
  });

  // Listen for data from the Python process
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Data received from Python: ${data.toString()}`);
  });

  // Listen for errors from the Python process
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error from Python: ${data.toString()}`);
  });

  // Listen for the Python process to exit
  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });
} catch (error) {
  console.error(`Error occurred: ${error.message}`);
}

// const { stdout, stderr } = await execPromisify(command10);
// console.log("Execution Complete.");
// if (stderr) {
//   console.error(`stderr: ${stderr}`);
//   return;
// }
// console.log(`stdout: ${stdout}`);


// try {
//   exec(`${command8}`, (error, stdout, stderr) => {
//       if (error) {
//           console.error(`exec error: ${error}`);
//           return;
//       }
//       console.log(`stdout: ${stdout}`);
//       if (stderr) {
//           console.error(`stderr: ${stderr}`);
//       }
//   });
// } catch (err) {
//   console.error(`Execution error: ${err}`);

// }

}

module.exports = {
  make_JSON_velociraptor_Artifact___kitty,
  get_Date_and_hour_string,
  active_velociraptor_JSON_in_py
};
