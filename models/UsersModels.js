const { error } = require('ajv/dist/vocabularies/applicator/dependencies.js')
const DBConnection = require('../db.js')
const { DiscrError } = require('ajv/dist/vocabularies/discriminator/types.js')
const { exec } = require('child_process');
 const config_table = "configjson"
  // const config_table = "tmp1"
 const config_column = "config"
 

async function Get_all_users_model() {
console.log("Get_all_users_model");
 
  try{
   
    const allusers  = await DBConnection('users')
    .select('email','user_id','type','user_name','name','last_login','state')
   if (allusers){return allusers}
 
}catch(err)
  
{console.log("get_All_Resource_Type_model", err);}
} 

 

module.exports = {
  Get_all_users_model

};