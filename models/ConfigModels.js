const { error } = require('ajv/dist/vocabularies/applicator/dependencies.js')
const DBConnection = require('../db.js')
const { DiscrError } = require('ajv/dist/vocabularies/discriminator/types.js')
const { exec } = require('child_process');
 const config_table = "configjson"
  // const config_table = "tmp1"
 const config_column = "config"
 
 async function put_full_config_model(config) {
console.log("the edited one:",config);
 
// const real_config = await get_full_config_model();
// console.log("real_config 000" ,          real_config );
//  real_config.General.alon = "alon2"

  if (config === undefined || config === null ){console.log("config file is," , config);return "Error in Put config file"}

    try {

      const stringified =  JSON.stringify( config) 
      const change_this = await DBConnection(config_table)
      .update({ config:stringified}) 
      .limit(1); //   first row
   console.log(change_this);

  // const stringified =  JSON.stringify( real_config) 
  //     const change_this = await DBConnection('configjson')
  //     .update({ config:stringified}) 
  //     .limit(1); //   first row
  //  console.log(change_this);
      
   


   // const [Nuclei] = await DBConnection.raw('SELECT JSON_EXTRACT(config,"$.Modules.Nuclei") as data FROM configjson;');
  // console.log("ddddssssssssssssssssss Nuclei"  , Nuclei[0].data);
  // const [ReqestStatus] = await DBConnection.raw('SELECT JSON_EXTRACT(config,"$.ReqestStatus") as data FROM configjson;');
  //  console.log("ReqestStatus ReqestStatus"  , ReqestStatus[0] );
   
  return change_this
  
            }
  

       catch (err) {
        const error_m = {
          error:"failed saving config",
          DiscrError:[err]
        }
        console.error('Error find get_full_config_model:', err);
        return error_m
     }
  } 

async function get_full_config_model() {

 

  try {

const [the_config_json] = await DBConnection(config_table).select(config_column)
// console.log("the_config_json  "  , the_config_json);
// console.log("the_config_json  "  , the_config_json.config.Modules.Nuclei);
// const [Nuclei] = await DBConnection.raw('SELECT JSON_EXTRACT(config,"$.Modules.Nuclei") as data FROM configjson;');
// console.log("ddddssssssssssssssssss Nuclei"  , Nuclei[0].data);

// const [ReqestStatus] = await DBConnection.raw('SELECT JSON_EXTRACT(config,"$.ReqestStatus") as data FROM configjson;');
//  console.log("ReqestStatus ReqestStatus"  , ReqestStatus[0] );

return the_config_json.config

          }

     catch (err) {
      const error_m = {
        error:"Error find get_full_config_model",
        DiscrError:[err]
      }
      console.error('Error find get_full_config_model:', err);
      return error_m
   }
} 

 

module.exports = { get_full_config_model,put_full_config_model};
