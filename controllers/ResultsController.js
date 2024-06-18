const { 

   get_all_velociraptor_artifacts_model ,get_single_velociraptor_result_model, count_response_files_model,find_latest_response_and_request ,get_requests_csv_table_model,make_cool_object_from_csv_table,get_ReqestStatus_from_config_file,add_time_note,check_main_process_status_model} = require('../models/ResultsModels');
 const {get_all_Modules_model, all_Modules_id_and_trashold, all_Artifacts_id_and_trashold} = require('../models/ToolsModels');

const DBConnection = require('../db.js');
const {v4: uuid} = require('uuid');
  




async function get_all_latest_results_dates(req, res, next) {
const results = req.query.results
if (results === undefined){ console.log("---results--:-  ",results);return}

try {

let lastResults ={}
 const filterd_Velociraptor = results.filter(element => element.ModuleName  === "Velociraptor");
 const filterd_Hunting = results.filter(element => element.Status  === "Hunting");
 const filterd_Complete = results.filter(element => element.Status  === "Complete");
 const filterd_Failed = results.filter(element => element.Status  === "Failed");
 
const check_last_resault =(filterd_array, filter_name) =>{

if (filterd_array.length === 0 || filterd_array === undefined){
  // console.log("filter_name",filter_name ,"is",filterd_array);
  lastResults = { ...lastResults, [filter_name]: "NA" };
  return }

let latestDate = null;

for (let index = 0; index < filterd_array.length; index++) {
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
check_last_resault(filterd_Complete, "Complete");
check_last_resault(filterd_Failed, "Failed");
check_last_resault(results, "Total");  



console.log("lastResults",lastResults);
    // const ReqestStatus = await get_ReqestStatus_from_config_file();
    // await add_time_note(ReqestStatus);
 

 if(lastResults){   res.send(lastResults);}
 
  } catch (err) {
    res.send(err.message)
    next(err);
  }
}


async function get_all_requests_table(req, res, next) {

 
  try {
    const ReqestStatus = await get_ReqestStatus_from_config_file();
    await add_time_note(ReqestStatus);

    // console.log("ReqestStatus",ReqestStatus);
    // const all_Modules = await get_all_Modules_model();

    

    if(ReqestStatus){   res.send(ReqestStatus);}
  } catch (err) {
    res.send(err.message)
    next(err);
  }
}

  async function get_single_velociraptor_response(req, res, next) {

 const { file_name } = req.query;
 console.log("get_single_velociraptor_response" , file_name);
 
     try {
     const result = await get_single_velociraptor_result_model(file_name)
     if (result){
      res.send(result)}
    } catch (err) {
      res.send(err.message)
      next(err);
    }
  }
  
  async function count_velociraptor_responses(req,res,next){
    try{
      const number = await count_response_files_model()
      if (number){res.send(number)}
    }catch(err){console.log(err); res.send(err)    }
  }

  async function check_last_req_and_res_for_module(req,res,next){
 

    const {module_id} = req.query
    if (module_id === undefined || module_id === '' || module_id === null){res.send("no module id"); return }
  
    try{

// const Modules_id_and_trashold = await all_Modules_id_and_trashold()
// const Artifacts_id_and_trashold = await all_Artifacts_id_and_trashold()



const latest = await find_latest_response_and_request(module_id)
 
// console.log("all_Modules_id_and_trashold" ,Modules_id_and_trashold);
// console.log("Artifacts_id_and_trashold" ,Artifacts_id_and_trashold);
      // const number = await count_response_files_model()
      if (latest){res.send(latest)}
    }catch(err){console.log(err); res.send(err)    }
  }

  module.exports = {

    get_all_latest_results_dates,
    get_single_velociraptor_response,
    count_velociraptor_responses,
    check_last_req_and_res_for_module,
    get_all_requests_table,
  };
  

  // async function get_all_requests_table(req, res, next) {

 
//   try {
//     const all_velociraptor_artifacts = await get_all_velociraptor_artifacts_model();
//     const all_Modules_model = await get_all_Modules_model();
//     const all_Modules =  all_Modules_model.Modules 

//     const filePath = await get_requests_csv_table_model();
//     const cool_object_from_csv_table = await make_cool_object_from_csv_table(filePath);

//     // const cool_object_from_csv_table = await make_cool_object_from_csv_table();

//     // requests_and_results_status = await read_();
   
//     // const results  = await  get_all_request_and_response_model(all_velociraptor_artifacts , all_Modules);
//     // const results_and_threshold_time  = await  calculating_request_response_threshold_time(results,all_velociraptor_artifacts , all_Modules);

//     if(cool_object_from_csv_table){   res.send(cool_object_from_csv_table);}
//   } catch (err) {
//     res.send(err.message)
//     next(err);
//   }
// }

// async function get_all_request_and_response(req, res, next) {
 
 
//   try {
//     const all_velociraptor_artifacts = await get_all_velociraptor_artifacts_model();
//     const all_Modules_model = await get_all_Modules_model();
//     const all_Modules =  all_Modules_model.Modules 

//     const results  = await  get_all_request_and_response_model(all_velociraptor_artifacts , all_Modules);
//     // const results_and_threshold_time  = await  calculating_request_response_threshold_time(results,all_velociraptor_artifacts , all_Modules);

//     if(results){   res.send(results);}
//   } catch (err) {
//     res.send(err.message)
//     next(err);
//   }
// }







  // async function get_all_velociraptor_responses_file_list(req, res, next) {

 
  //   try {
  //     const all_velociraptor_artifacts = await get_all_velociraptor_artifacts_model();

  //     const all_Modules_model = await get_all_Modules_model();
  //     const all_Modules =  all_Modules_model.Modules 

  //     const all_velociraptor_results  = await  get_all_velociraptor_results_model(all_velociraptor_artifacts , all_Modules);
  //     if(all_velociraptor_results){   res.send(all_velociraptor_results);}
  //   } catch (err) {
  //     res.send(err.message)
  //     next(err);
  //   }
  // }
  
   

  // async function write_to_csv(req, res, next) {
//   const filePath = await get_requests_csv_table_model();
//   const the_orginal_file = await make_cool_object_from_csv_table(filePath);
//   const write = await write_to_csv_table(filePath,the_orginal_file);


  


//   try {
 
 
//   } catch (err) {
//     res.send(err.message)
//     next(err);
//   }
// }


// async function Check_Interval_Status(req, res, next) {
//   console.log("check_main_process_status 111111111111111111111111111111111111111");
//   const momo = "3333"
//   res.send(momo);
 
//   // try {
 
//     // const process_status = await check_main_process_status_model();

//     const bobo =  await  check_main_process_status_model().then(isRunning => {
//       console.log('Process running status:', isRunning);
//       //  res.send(isRunning)
//        ;
//       if (bobo){      console.log('isRunning bobo ', isRunning,"sssssss",bobo );}
//   }).catch(error => {
//       console.error('Error:', error);res.send("sssssssssssssssssss"); next(error);
//   });


 
// }