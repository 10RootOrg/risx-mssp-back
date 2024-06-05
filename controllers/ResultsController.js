const { 
  // get_all_velociraptor_results_model,
  // get_all_request_and_response_model,
   get_all_velociraptor_artifacts_model ,get_single_velociraptor_result_model, count_response_files_model,find_latest_response_and_request ,get_requests_csv_table_model,make_cool_object_from_csv_table,get_ReqestStatus_from_config_file,add_time_note} = require('../models/ResultsModels');
 const {get_all_Modules_model, all_Modules_id_and_trashold, all_Artifacts_id_and_trashold} = require('../models/ToolsModels');

const DBConnection = require('../db.js');
const {v4: uuid} = require('uuid');
   


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
console.log("get_single_velociraptor_response");
 const { file_name } = req.query;
 
 
     try {
     const result = await get_single_velociraptor_result_model(file_name)
     if (res){ res.send(result)}
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
    // get_all_request_and_response,
    // get_all_velociraptor_responses_file_list,
    get_single_velociraptor_response,
    count_velociraptor_responses,
    check_last_req_and_res_for_module,
    get_all_requests_table,
    // write_to_csv
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
