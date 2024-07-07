// const DatabaseError = require('../errors/DatabaseError');
// const { log } = require('console');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const { log } = require('console');
// const {assert} = require('assert');
// const { loadavg } = require('os');
 
const fs = require('fs').promises;
const fs_non_promises = require('fs');
const csv = require('csv-parser')
 const  path = require('path');
const DBConnection = require('../db.js');
const { exec } = require('child_process');
const { spawn } = require('child_process');
const { log } = require('console');
 


async function get_all_latest_results_dates(results) {
  // console.log("get_all_latest_results_dates1", results);
// console.log("get_all_latest_results_dates2", results?.length);


  if (results === undefined){ console.log("---results--:-  ",results);return {};}
  
  try {
  
  let lastResults ={}
   const filterd_Velociraptor = results.filter(element => element.ModuleName  === "Velociraptor");
   const filterd_Hunting = results.filter(element => element.Status  === "Hunting");
   const filterd_InProgress = results.filter(element => element.Status  === "in Progress");
   const filterd_Complete = results.filter(element => element.Status  === "Complete");
   const filterd_Failed = results.filter(element => element.Status  === "Failed");




  const check_last_resault =(filterd_array, filter_name) =>{
  
  if (filterd_array.length === 0 || filterd_array === undefined){
    // console.log("filter_name",filter_name ,"is",filterd_array);
    lastResults = { ...lastResults, [filter_name]: "NA" };
    return }
  
  let latestDate = null;
  
  for (let index = 0; index < filterd_array.length; index++) {

    // console.log("filterd_array[index]",filterd_array[index]);
    const date = filterd_array[index]?.LastIntervalDatePrecise;
    if (!latestDate || new Date(date) > new Date(latestDate)) {
      latestDate = date;
    }
  }
  
  lastResults = { ...lastResults, [filter_name]: latestDate };
  
  console.log(`Latest date in ${filter_name}:`, latestDate);
  };
  

  check_last_resault(filterd_Velociraptor, "Velociraptor");
  check_last_resault(filterd_Hunting, "Hunting");
  check_last_resault(filterd_InProgress, "in Progress");
  check_last_resault(filterd_Complete, "Complete");
  check_last_resault(filterd_Failed, "Failed");
  check_last_resault(results, "Total");  
  
  
  
  console.log("lastResults",lastResults);
      // const ReqestStatus = await get_ReqestStatus_from_config_file();
      // await add_time_note(ReqestStatus);
   
  
   if(lastResults){   return(lastResults);}
   
    } catch (err) {
    return(err.message)
      next(err);
    }
  }
  


function string_to_date(dateString){
 try{
  const dateStringArray = dateString.split("-");
  const day = dateStringArray[0]
  const month = dateStringArray[1]
  const year = dateStringArray[2] 
  const hour = dateStringArray[3] 
  const minute = dateStringArray[4] 
  const second = dateStringArray[5] 
  const event = new Date(`${month} ${day}, ${year} ${hour}:${minute}:${second}`);

return event
}catch(err){console.log(err);return "error in date" }

}

function compare_dates(end_date, start_date){
  try{
  const compare = (end_date - start_date)/60000
  if(compare>0){
      // console.log("in time");
      return "In Time"
  }
  if(compare<0){
      //  console.log("not in time" ); 
  
   
  
      if(-compare <= 59){
          // console.log("pass by", -compare, "Min"); 
          const return_this = "+"+ -compare + " Min"
       return return_this
      }
  
      if(  59 < -compare &&   1439 > -compare){
          const hours  = Math.floor(-compare / 60);
          const minutes = -compare % 60;

          let return_this_2

            if ( hours != 1){ return_this_2 = "+"+hours + " Hrs";}
          else  if (hours === 1){ return_this_2 = "+"+hours + " Hr";}
            // else if(minutes !=0) {return_this_2 = "+"+hours + " Hrs " + minutes + " Mins";}    

          return return_this_2;

      }
      if(   1440 <= -compare ){
          const days  = Math.floor(-compare / 1440);
          const remainingHours = Math.floor((-compare % 1440) / 60); // Calculate remaining hours
          const return_this = "+"+days + " Days";
          return return_this
      
  
      }
  }

return  
}catch(err){console.log(err);return "check compare_dates" }

}

async function add_time_note(ReqestStatus){

  try{
    for (let i = 0; i < ReqestStatus.length; i++) {


       const LastIntervalDate = await string_to_date(ReqestStatus[i]?.LastIntervalDate);


    console.log("LastIntervalDate --------  333",      ReqestStatus[i]?.Status);


         ReqestStatus[i].LastIntervalDatePrecise =  LastIntervalDate
      if (ReqestStatus[i]?.Status === "Complete"  || ReqestStatus[i]?.Status === "Hunting" || ReqestStatus[i]?.Status === "In Progress"  ){

  //  console.log("ddddddddddd 444"  ,ReqestStatus[i]?.ModuleName       );
        // console.log("----ReqestStatus[i]?.ExpireDate----", ReqestStatus[i]?.ExpireDate);
  
 const ExpireDate = string_to_date(ReqestStatus[i]?.ExpireDate);


  if(ReqestStatus[i]?.ExpireDate === "" || ReqestStatus[i]?.ExpireDate === undefined){
      ReqestStatus[i].TimeNote =  "NoData"
      return }
else{
  const note = compare_dates(ExpireDate,LastIntervalDate)

  ReqestStatus[i].TimeNote =  note
}


      }     
    }
        return  "ddddd"
     }



 
  
  
  
  catch(err){res.send(err)}
}

async function get_ReqestStatus_from_config_file() {
   
  try {
const [ReqestStatus] = await DBConnection.raw('SELECT JSON_EXTRACT(config,"$.RequestStatus") as data FROM configjson;');





//    const [Nuclei] = await DBConnection.raw('SELECT JSON_EXTRACT(config,"$.Modules.Nuclei") as data FROM configjson;');
//   console.log("ddddssssssssssssssssss Nuclei"  , Nuclei[0].data);

// console.log("ReqestStatus1"  ,   ReqestStatus );

//  console.log("ReqestStatus2"  ,   ReqestStatus?.[0].data );
  
    return  ReqestStatus?.[0].data

  
  } catch (err) {
    console.error('Error reading or parsing file:', err);
    return []; // Return an empty array in case of error
  }
}







async function check_file_size(file_name) {
console.log("-------check_file_size-----");
      try {

  const relativePath = process.env.PYTHON_SCRIPTS_RELATIVE_PATH;
  const directoryPath = path.join(__dirname, '..','..', relativePath);
  const fullPath = path.join(directoryPath,file_name);


    // Check if the directory exists (will throw if it doesn't)
    await fs.access(directoryPath);
    const stats = await  fs_non_promises.statSync(directoryPath);
    const fileSizeInBytes = stats?.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024*1024);

return fileSizeInMegabytes



  } catch (err) {
    console.error('check_file_size:', err);
  }
 
}


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

async function get_all_velociraptor_artifacts_model(){
try{
const all_velociraptor_artifacts = await DBConnection("artifacts").select('*')
if(all_velociraptor_artifacts
  
  
  ){
     return  all_velociraptor_artifacts}


}
catch(err){res.send(err)}
}




async function get_velociraptor_aggregate_macro_model(SubModuleName,ResponseFile) {

console.log("get_velociraptor_aggregate_macro_model",SubModuleName,ResponseFile);


let macro_file_name = ""

// console.log("nnnnnnnnnnnnnnnnnnnnnnn",ResponseFile);

 try{ 

    // if(  ResponseFile.includes("response_")){  macro_file_name = ResponseFile.replace("response", "macro");}
    if (ResponseFile.includes("response_")) {


      const fileName = ResponseFile.split("/").pop();

      // משנים את "response" ל-"macro"
      macro_file_name  = fileName.replace("response", "macro");
   

 

      // const parts = ResponseFile.split("/");
      // const filename = parts.pop(); // Remove the last part (filename)
      
      // // Replace "response" with "macro" in the filename part only
      // const newFilename = filename.replace("response", "macro");
      
      // // Reconstruct the path with the updated filename
      // parts.push(newFilename);
      // const updatedPath = parts.join("/");
      // macro_file_name =updatedPath
      // console.log("ccccccccccccccccccccccc",updatedPath); // Output: response_folder/macro_VelociraptorHardeningKitty_02-07-2024-07-28-19.json
    }



  const relativePath = process.env.PYTHON_VELOCIRAPTOR_RESPONSE_AND_REQUEST_PATH;
  const directoryPath = path.join(__dirname, '..','..', relativePath,"response_folder");
  // const directoryPath = path.join(__dirname, '..','..', relativePath);
  // const fullPath = path.join(directoryPath, `${macro_file_name}.json`);
  const fullPath = path.join(directoryPath,macro_file_name);


  console.log("sssssssssssssssssssssssssssss",fullPath);
    await fs.access(directoryPath);

const JSON_file = await fs. readFile(fullPath, 'utf8', (err, data) => {
  if (err) {
 
  console. error(err);
  return;
  }
 
  });
  
 if(JSON_file){
// console.log("JSON_file", JSON_file);
  const [parsed] = await JSON.parse(JSON_file)

  return parsed

 }


} catch (err) {
  console.error('Error get_velociraptor_aggregate_macro_model:', err);
}



}








async function order_result_aggregate_macro_model(result) {

  if (result === undefined) {
    return false
  }
  
try{


    console.log("result jjjjjjjjjj0", result);
    // console.log(result['Failed Test/Number of tests']);
   const string =  result['Failed Test/Number of tests']
   const Failed_Test_Number_of_tests = string.split("/");
   const convertedNumbers = Failed_Test_Number_of_tests.map(numStr => Number(numStr));
   result.Failed_Test_Number_of_tests = convertedNumbers
  


  //  const severityOrder = ['Critical', 'High', 'Medium', 'Low'];

  //  const severities = severityOrder;
  //  const counts = severityOrder.map(severity => inputObject[`Count of ${severity}`]);
   
  //  console.log('const severities =', JSON.stringify(severities), ';');
  //  console.log('const counts =', JSON.stringify(counts), ';');


  const severityOrder = ['Critical', 'High', 'Medium', 'Low'];
  const severities = severityOrder;
  const counts = severityOrder.map(severity => result[`Count of ${severity}`]);
  console.log('const severities =', JSON.stringify(severities), ';');
  console.log('const counts =', JSON.stringify(counts), ';');
  result.severity_Order  = severities
  result.severity_Counts = counts






  
    return result
}catch(err){console.log("order_result_aggregate_macro_model",err);return  err}  
 
  }

  // async function download_file_model(fullPath) {
 
    
  //       // Check if the directory exists (will throw if it doesn't)
      
    
  //   const file = await fs. readFile(fullPath, 'utf8', (err, data) => {
  //     if (err) {
     
  //     console. error(err);
  //     return;
  //     }
     
  //     });
      
    
  //    if(file){
  //     return file
    
  //    }
  //   }

//   async function download_file_model(fullPath) {
 
    
//     if (fs_non_promises.existsSync(fullPath)) {
//       // Set headers to force download
//       res.setHeader('Content-disposition', 'attachment; filename=example.json');
//       res.setHeader('Content-type', 'application/json');

//       // Create a read stream from the file and pipe it to the response
//       const fileStream = fs.createReadStream(jsonFilePath);
//       fileStream.pipe(res);
//   } else {
//       res.status(404).send('File not found');
//   }
// }

async function get_single_velociraptor_result_model(file_name) {


  const relativePath = process.env.PYTHON_VELOCIRAPTOR_RESPONSE_AND_REQUEST_PATH;
  const directoryPath = path.join(__dirname, '..','..', relativePath);
  // let fullPath =""
  // const   fullPath = path.join(directoryPath,`\\`,file_name);
  const fullPath = path.join(directoryPath,file_name);



    // Check if the directory exists (will throw if it doesn't)
    await fs.access(directoryPath);

const JSON_file = await fs. readFile(fullPath, 'utf8', (err, data) => {
  if (err) {
 
  console. error(err);
  return;
  }
 
  });
  

 if(JSON_file){



  const parsed =JSON.parse(JSON_file)

 
 if (parsed?.error === 'No data collected.') { return 'No data collected.'}
  // console.log("parsed?.table   eeeeeeeeeeeeeeeeeeeeeeeeee",parsed?.table );
  if ( parsed?.table &&  parsed?.table.length != 0  ){
    parsed.table= JSON.parse(parsed.table)
  }

  return parsed

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


 
       


 


return  {last_response:last_response , last_request:last_request}
    } catch (err) {
      console.error('Error find latest_response_and_request:', err);
   }
  



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



// async function add_time_note(ReqestStatus,all_Modules){

//   const Modules = all_Modules.Modules
 


//   try{
//     for (let i = 0; i < ReqestStatus.length; i++) {
//     //  console.log("----3-----", ReqestStatus[i]?.ModuleID);
    
//      for (let j = 0; j < Modules.length; j++) {
//       // console.log("-----5----", Modules[j]?.tool_id);
   
//        if (Modules[j]?.tool_id === ReqestStatus[i]?.ModuleID) {
//         ReqestStatus[i].isInTime=true
//          console.log("bingo");



//        }
//      }



//     }



 

//        return  "ddddd"
  
  
//   }
//   catch(err){res.send(err)}
//   }


module.exports = {
  // get_all_velociraptor_results_model,
  get_all_velociraptor_artifacts_model,
  get_single_velociraptor_result_model,
  count_response_files_model,
  find_latest_response_and_request,
  // get_all_request_and_response_model,
  get_requests_csv_table_model,
  make_cool_object_from_csv_table,
  check_file_size,
  get_ReqestStatus_from_config_file,
  add_time_note,
  get_all_latest_results_dates,
  get_velociraptor_aggregate_macro_model,
  order_result_aggregate_macro_model,
  // download_file_model

};