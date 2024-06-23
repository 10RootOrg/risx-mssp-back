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
 


async function get_all_latest_results_dates(results) {
  // console.log("get_all_latest_results_dates1", results);
// console.log("get_all_latest_results_dates2", results?.length);


  if (results === undefined){ console.log("---results--:-  ",results);return {};}
  
  try {
  
  let lastResults ={}
   const filterd_Velociraptor = results.filter(element => element.ModuleName  === "Velociraptor");
   const filterd_Hunting = results.filter(element => element.Status  === "Hunting");
   const filterd_InProgress = results.filter(element => element.Status  === "inProgress");
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
  check_last_resault(filterd_InProgress, "inProgress");
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


      //  console.log("LastIntervalDate --------  333",ReqestStatus[i].ModuleName,         LastIntervalDate);


         ReqestStatus[i].LastIntervalDatePrecise =  LastIntervalDate
      if (ReqestStatus[i]?.Status === "Complete"  || ReqestStatus[i]?.Status === "Hunting" || ReqestStatus[i]?.Status === "inProgress"  ){

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

// const tmp = [
//   {
//     Error: '',
//     HuntID: '',
//     Status: 'Complete',
//     ModuleID: '2000000',
//     UniqueID: '',
//     Arguments: {},
//     RequestId: '',
//     StartDate: '21-05-24-11-20-18',
//     SubModule: 'HardeningKitty',
//     ArtifactID: '1000103',
//     ExpireDate: '22-05-24-11-20-18',
//     ModuleName: 'Velociraptor',
//     TimeInterval: '',
//     Response_Path: 'response_velociraptor_21-05-24-11-20-18_artifact_id_1000103.json',
//     LastIntervalDate: '21-05-24-15-20-18'
//   },
//   {
//     Error: '',
//     HuntID: '',
//     Status: 'Request',
//     ModuleID: '2001005',
//     UniqueID: '',
//     Arguments: {},
//     RequestId: '',
//     StartDate: '30-05-24-10-57-07',
//     SubModule: '',
//     ArtifactID: '',
//     ExpireDate: '30-06-24-10-57-07',
//     ModuleName: 'Nuclei',
//     TimeInterval: '',
//     Response_Path: 'response_nuclei_30-05-24-10-57-07_module_id_2001005.json',
//     LastIntervalDate: '04-06-24-10-57-07'
//   },
//   {
//     Error: '',
//     HuntID: '',
//     Status: 'Complete',
//     ModuleID: '2001005',
//     UniqueID: '',
//     Arguments: {},
//     RequestId: '',
//     StartDate: '21-05-24-11-20-18',
//     SubModule: '',
//     ArtifactID: '',
//     ExpireDate: '21-05-24-14-20-18',
//     ModuleName: 'Nuclei',
//     TimeInterval: '',
//     Response_Path: 'response_velociraptor_21-05-24-11-20-18_artifact_id_1000105',
//     LastIntervalDate: '21-05-24-15-20-18'
//   }
// ]

    // return  tmp;
  } catch (err) {
    console.error('Error reading or parsing file:', err);
    return []; // Return an empty array in case of error
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


async function get_single_velociraptor_result_model(file_name) {


  const relativePath = process.env.PYTHON_VELOCIRAPTOR_RESPONSE_AND_REQUEST_PATH;
  const directoryPath = path.join(__dirname, '..','..', relativePath);
  // let fullPath =""
  // const   fullPath = path.join(directoryPath,`\\`,file_name);
  const fullPath = path.join(directoryPath,file_name);





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
    get_ReqestStatus_from_config_file,
    add_time_note,
    get_all_latest_results_dates
 
};

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
