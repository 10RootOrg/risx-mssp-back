// const DatabaseError = require('../errors/DatabaseError');
// const { log } = require('console');
const fs = require('fs').promises;
const fs_non_promises = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const { log } = require('console');

const {assert} = require('assert');
const csv = require('csv-parser')

 const  path = require('path');
const DBConnection = require('../db.js');
const { loadavg } = require('os');
 

async function get_requests_csv_table_model(){

const relativePath = process.env.PYTHON_VELOCIRAPTOR_RESPONSE_AND_REQUEST_PATH;
const directoryPath = path.join(__dirname, '..','..', relativePath);
const filePath = path.join(__dirname, '..','..', relativePath,'RequestsTable.csv');

try {
    // Check if the directory exists (will throw if it doesn't)
  await fs.access(directoryPath);
  // Read the CSV file
  // const data = await fs.readFile(filePath, 'utf8');
  
 
 
 if (filePath) return filePath
} catch (err) {
  console.error('Error reading or parsing file:', err);
}






}


    // if (!requests_csv_table || typeof requests_csv_table !== 'string' || requests_csv_table.trim() === '') {
    //   console.error('Error: Invalid CSV data');
    //   return []; // Return an empty array
    // }

async function make_cool_object_from_csv_table(filePath) {
   
  try {
    const results = [];

    const stream = fs_non_promises.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data));

    // Wait for the 'end' event to be emitted to ensure the CSV parsing is complete
    await new Promise((resolve, reject) => {
      stream.on('end', () => {
        console.log("CSV parsing complete");
        resolve();
      });
      stream.on('error', reject);
    });

    return results;
  } catch (err) {
    console.error('Error reading or parsing file:', err);
    return []; // Return an empty array in case of error
  }
}

// async function write_to_csv_table(filePath,the_orginal_file) {

//   console.log("write_to_csv_table 33333333333333333333333", the_orginal_file[0]);
//  const headrs  = Object.keys(the_orginal_file[0]).map(a=>{return{id: a, title: a}} )

//  console.log("write_to_csv_table 44444444444444444444444444", headrs);
//     try {
//       const csvWriter = createCsvWriter({
//         // path: 'path/to/file.csv',
//         path: filePath,
//         header: headrs,
//         append:true

//     });
     
//     const records = [
//         {Module_Name: 'Alon3',  Sub_Module: 'wolf13, wolf23'},
//     ];
     
//     csvWriter.writeRecords(records)       // returns a promise
//         .then(() => {
//             console.log('...Done');
//         });
 
  
//       return "done_write_to_csv_table";
//     } catch (err) {
//       console.error('Error reading or parsing file:', err);
//       return []; // Return an empty array in case of error
//     }
//   }
  
  

//   async function get_all_request_and_response_model(all_velociraptor_artifacts, all_Modules) {
//     try {
//       const relativePath = process.env.PYTHON_VELOCIRAPTOR_RESPONSE_AND_REQUEST_PATH;
//       const directoryPath = path.join(__dirname, '..','..', relativePath);


//         // Check if the directory exists (will throw if it doesn't)
//         await fs.access(directoryPath);
    
//         // Read directory contents
//         const allfiles = await fs.readdir(directoryPath);

//         const response_files = allfiles.filter(file => file.startsWith('response_'));
//         const request_files = allfiles.filter(file => file.startsWith('request_'));


        
// const json_files_array = []

//         for (let request_file_name of request_files) {
 
//           // Get the file's stats
//           const filePath = path.join(directoryPath, request_file_name);
//           const stats = await fs.stat(filePath);
 


// let request_file_name_time =""

// let has_response = false
// let response_file_name = null
// let response_time = null
// let artifact_id =""
// let artifact_name_for_json = ""
// let module_id =""
// let module_name_for_json = ""
// let threshold_time = null
// let threshold_time_has_passed = null
// let time_Difference_Req_Res_Minutes = null
// let time_Difference_Req_Res_Hours = null
// let time_Difference_Req_Res_Days = null



//  // for request_velociraptor
// if (request_file_name.startsWith('request_velociraptor') ){

//   artifact_id = request_file_name.split("artifact_id_").pop().replace(".json", "");  
//   request_file_name_time = request_file_name.replace("request_velociraptor_", "").replace(/_artifact_id_.*/, '');  

//   //give the request_velociraptor  artifact_name
//   for (let index = 0; index < all_velociraptor_artifacts.length; index++) {
//     if  (artifact_id != undefined &&artifact_id === all_velociraptor_artifacts[index]?.artifact_id ) { 
//        artifact_name_for_json = all_velociraptor_artifacts[index]?.Toolname; 
//        threshold_time =         all_velociraptor_artifacts[index]?.threshold_time; 
       
//       }
// }

// //find if request_velociraptor file has response
// for (let index = 0; index < response_files.length; index++) {

// /// ריספונסים של ולוסירפטור
//   if  (response_files[index]?.startsWith('response_velociraptor')    ) { 

//    const request_time_from_response_file_name = response_files[index]?.replace("response_velociraptor_", "").replace(/_artifact_id_.*/, '');  
//    const rartifact_id_from_response_file_name = response_files[index]?.split("artifact_id_").pop().replace(".json", "");  
//   if(request_time_from_response_file_name === request_file_name_time &&  rartifact_id_from_response_file_name === artifact_id ){

//     console.log("bingo for", request_file_name_time);
//     response_file_name = response_files[index];
//     has_response = true ;
//     const filePath = path.join(directoryPath, response_files[index]);
//     const stats = await fs.stat(filePath);
//     response_time =stats.mtime;


//     console.log('00000000000000000000000000', filePath );





//   }
//   }

// }

// }

//  // for other module requests
// else{
 
//   module_id = request_file_name.split("module_id_").pop().replace(".json", "");  
//   request_file_name_time = request_file_name.split("_")[2];
//     //give the module_name
//   for (let index = 0; index < all_Modules.length; index++) {
//     if  (module_id != undefined && module_id === all_Modules[index]?.tool_id ) { 
//       module_name_for_json = all_Modules[index]?.Tool_name;
//       threshold_time = all_Modules[index]?.threshold_time;
    
//     }
// }

// //find if request file has response
// for (let index = 0; index < response_files.length; index++) {

//   if  (!response_files[index]?.startsWith('response_velociraptor')    ) { 

//    const request_time_from_response_file_name = response_files[index]?.split("_")[2];
//    const module_id_from_response_file_name    = response_files[index]?.split("module_id_").pop().replace(".json", "");  

//   if(request_time_from_response_file_name === request_file_name_time &&  module_id_from_response_file_name === module_id ){


//  console.log("bingo for", request_file_name);
//     response_file_name = response_files[index];
//     has_response = true ;
//   const filePath = path.join(directoryPath, response_files[index]);
//    const stats = await fs.stat(filePath);
//    response_time =stats.mtime;


 


//   }
 


//   }

//   // console.log(response_files[index]);
// }






// }

// if(response_time != null){
//   const timeDifferenceInMilliseconds = response_time - stats.birthtime;
//   const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
  
//   time_Difference_Req_Res_Days  = Math.floor(timeDifferenceInSeconds / (24 * 3600)); // 1 day = 24 hours = 24 * 3600 seconds
//   time_Difference_Req_Res_Hours = Math.floor(timeDifferenceInSeconds / 3600); // 1 hour = 3600 seconds
//   time_Difference_Req_Res_Minutes = Math.floor(timeDifferenceInSeconds / 60);
   
//   if (threshold_time >= time_Difference_Req_Res_Minutes){threshold_time_has_passed = false}
//   else if (threshold_time < time_Difference_Req_Res_Minutes){threshold_time_has_passed = true}
// }
// else if(response_time == null){
//   const now = new Date(); // Current time
//   const timeDifferenceInMilliseconds = now - stats.birthtime;
//   const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
//   time_Difference_Req_Res_Days  = Math.floor(timeDifferenceInSeconds / (24 * 3600)); // 1 day = 24 hours = 24 * 3600 seconds
//   time_Difference_Req_Res_Hours = Math.floor(timeDifferenceInSeconds / 3600); // 1 hour = 3600 seconds
//   time_Difference_Req_Res_Minutes = Math.floor(timeDifferenceInSeconds / 60);
//   if (threshold_time >= time_Difference_Req_Res_Minutes){threshold_time_has_passed = false}
//   else if (threshold_time < time_Difference_Req_Res_Minutes){threshold_time_has_passed = true}

// }

 

// // let time_Difference_Minutes = null
// // let time_Difference_Hours = null time_Difference_Days



// const item = {
//   request_file_name: request_file_name,

//   artifact_id:artifact_id,
//   artifact_name: artifact_name_for_json,

//   module_id:module_id,
//   module_name:module_name_for_json,

 
//   request_file_name_time:request_file_name_time,
 

//   has_response:has_response,
//   response_file_name: response_file_name,
//   request_time: stats.birthtime,
//   response_time:  response_time,
//   threshold_time:threshold_time,
//   threshold_time_has_passed: threshold_time_has_passed,
//   time_Difference_Req_Res_Minutes: time_Difference_Req_Res_Minutes,
//   time_Difference_Req_Res_Hours:   time_Difference_Req_Res_Hours,
//   time_Difference_Req_Res_Days:    time_Difference_Req_Res_Days
// }

//   json_files_array.push(item)
    
//         }
// // console.log("json_files_array" ,json_files_array);
// return json_files_array
//       } catch (err) {
//         console.error('Error accessing or reading the directory:', err);
//       }
    


  
// }

async function get_all_velociraptor_artifacts_model(){
try{
const all_velociraptor_artifacts = await DBConnection("artifacts").select('*')
if(all_velociraptor_artifacts
  
  
  ){
     return  all_velociraptor_artifacts}


}
catch(err){res.send(err)}
}

// async function get_all_velociraptor_results_model(all_velociraptor_artifacts, all_Modules) {
//     try {
//       const relativePath = process.env.PYTHON_VELOCIRAPTOR_RESPONSE_AND_REQUEST_PATH;
//       const directoryPath = path.join(__dirname, '..','..', relativePath);


//         // Check if the directory exists (will throw if it doesn't)
//         await fs.access(directoryPath);
    
//         // Read directory contents
//         const allfiles = await fs.readdir(directoryPath);
//         const files = allfiles.filter(file => file.startsWith('response_'));

// const json_files_array = []

//         for (let file of files) {

//           // Get the file's stats
//           const filePath = path.join(directoryPath, file);
//           const stats = await fs.stat(filePath);
  

// let request_time =""

// let artifact_id =""
// let  artifact_name_for_json = ""

// let module_id =""
// let module_name_for_json = ""

// if (file.startsWith('response_velociraptor') ){
//   artifact_id = file.split("artifact_id_").pop().replace(".json", "");  
//   request_time = file.replace("response_velociraptor_", "").replace(/_artifact_id_.*/, '');  

//   for (let index = 0; index < all_velociraptor_artifacts.length; index++) {
//     if  (artifact_id != undefined &&artifact_id === all_velociraptor_artifacts[index]?.artifact_id ) { 
//        artifact_name_for_json = all_velociraptor_artifacts[index]?.Toolname;  }
// }

// }



// else{
//   module_id = file.split("module_id_").pop().replace(".json", "");  
//   request_time = file.split("_")[2];

//   for (let index = 0; index < all_Modules.length; index++) {
//     if  (module_id != undefined && module_id === all_Modules[index]?.tool_id ) { 
//       module_name_for_json = all_Modules[index]?.Tool_name;  }
// }

// }


   
   

         


    

// const item = {
//   file_name: file,

//   artifact_id:artifact_id,
//   artifact_name: artifact_name_for_json,

//   module_id:module_id,
//   module_name:module_name_for_json,

//   request_time:request_time,
//   response_time: stats.birthtime}

//   json_files_array.push(item)
//           // Log file details
//           // console.log({
//           //   name: file,
//           //   artifact_id:artifact_id,
//           //   artifact_name: artifact_name_for_json,
//           //   request:request_time,
//           //   response: stats.birthtime
//           // });
//         }
// // console.log("json_files_array" ,json_files_array);
// return json_files_array
//       } catch (err) {
//         console.error('Error accessing or reading the directory:', err);
//       }
    


  
// }
 
async function get_single_velociraptor_result_model(file_name) {




 
 
  const relativePath = process.env.PYTHON_VELOCIRAPTOR_RESPONSE_AND_REQUEST_PATH;
  const directoryPath = path.join(__dirname, '..','..', relativePath);
  // let fullPath =""
  // const   fullPath = path.join(directoryPath,`\\`,file_name);
  const fullPath = path.join(directoryPath,file_name);




  // console.log('111', path.join(directoryPath,`\\`,file_name));
  // console.log('222', path.join(directoryPath,`//`,file_name));
  // console.log('333', path.join(directoryPath,``,file_name));
  // console.log('444', path.join(directoryPath,file_name));


  // if (process.platform === 'win32') {
  //   console.log('Running on Windows');
  //   fullPath = path.join(directoryPath,`\\`,file_name);

  // } else if (process.platform === 'linux') {
  //   console.log('Running on Linux');
  //   fullPath = path.join(directoryPath,`\\`,file_name);
  // } else {
  //   console.log('Running on another platform');
  //   fullPath = path.join(directoryPath,`\\`,file_name);

  // }





//   console.log("directoryPath" , directoryPath);
//   console.log("file_name" , file_name);
//  console.log("fullPath" , fullPath);


    // Check if the directory exists (will throw if it doesn't)
    await fs.access(directoryPath);
// const sss="ddd"
    // Read directory contents
//     const allfiles = await fs.readdir(directoryPath);
//     const files = allfiles.filter(file => file === sss );
// console.log(files);
const JSON_file = await fs. readFile(fullPath, 'utf8', (err, data) => {
  if (err) {
 
  console. error(err);
  return;
  }
 
  });
  

 if(JSON_file){
  const parsed =JSON.parse(JSON_file)

  console.log("eeee",parsed?.table );

  if ( parsed?.table &&  parsed?.table.length != 0  ){
    parsed.table= JSON.parse(parsed.table)
  }



  // parsed.table= JSON.parse(parsed.table)
  // console.log(parsed.table,typeof parsed.table);

  return parsed
  // console.log("--------------------11111---------------------",  JSON.parse(JSON_file));
 
 }
}
async function count_response_files_model() {

  try {
 
    const relativePath = process.env.PYTHON_VELOCIRAPTOR_RESPONSE_AND_REQUEST_PATH;
    const directoryPath = path.join(__dirname, '..','..', relativePath);

      // Check if the directory exists (will throw if it doesn't)
      await fs.access(directoryPath);
  
      // Read directory contents
      const allfiles = await fs.readdir(directoryPath);
      const files = allfiles.filter(file => file.startsWith('response_'));
      const number = {number: files?.length}
 
 
// console.log("json_files_array" ,json_files_array);
return  number
    } catch (err) {
      console.error('Error accessing or reading the directory:', err);
    }
  



} 
 
async function find_latest_response_and_request(module_id) {

// iddddd ="2001005"

  try {
 
    const relativePath = process.env.PYTHON_VELOCIRAPTOR_RESPONSE_AND_REQUEST_PATH;
    const directoryPath = path.join(__dirname, '..','..', relativePath);

      // Check if the directory exists (will throw if it doesn't)
      await fs.access(directoryPath);
  
      // Read directory contents
      const allfiles = await fs.readdir(directoryPath);

      let last_response = 0;
      let last_request = 0;
// let times = {last_response:last_response , last_request:last_request}
      const response_files = allfiles.filter(file => 
        file.startsWith('response') && file.endsWith(`${module_id}.json`));

            for (const file of response_files) {
              const filePath = path.join(directoryPath, file);
              const stats = await fs.stat(filePath);

              if (!last_response || stats.birthtime > last_response) {
               {  last_response =   stats.birthtime };
            }
          }

    const request_files = allfiles.filter(file => 
        file.startsWith('request') && file.endsWith(`${module_id}.json`));

            for (const file of request_files) {
              const filePath = path.join(directoryPath, file);
              const stats = await fs.stat(filePath);

              if (!last_request || stats.birthtime > last_request) {
               {  last_request =   stats.birthtime };
            }
          }


 
       


          

          // // Extracting date components
          // const day = last_response.getDate().toString().padStart(2, '0');   // Day (01-31)
          // const month = (last_response.getMonth() + 1).toString().padStart(2, '0'); // Month (01-12, +1 because getMonth returns 0-11)
          // const year = last_response.getFullYear().toString().slice(2);      // Last two digits of the year
          // const hours = last_response.getHours().toString().padStart(2, '0'); // Hours (00-23)
          // const minutes = last_response.getMinutes().toString().padStart(2, '0'); // Minutes (00-59)
          // const seconds = last_response.getSeconds().toString().padStart(2, '0'); // Seconds (00-59)
          
          // // Formatting the date
          // const formattedDate = `${day} ${month} ${year} : ${hours}:${minutes}:${seconds}`;
          
          // console.log(formattedDate);




return  {last_response:last_response , last_request:last_request}
    } catch (err) {
      console.error('Error find latest_response_and_request:', err);
   }
  



} 



module.exports = {
    // get_all_velociraptor_results_model,
    get_all_velociraptor_artifacts_model,
    get_single_velociraptor_result_model,
    count_response_files_model,
    find_latest_response_and_request,
    // get_all_request_and_response_model,
    get_requests_csv_table_model,
    make_cool_object_from_csv_table,
    // write_to_csv_table,
};
