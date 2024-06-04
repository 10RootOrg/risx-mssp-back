
 const { get_full_config_model ,put_full_config_model } = require('../models/ConfigModels');

async function Get_Config(req, res, next) {
  try{
 
    const file = await get_full_config_model()  
 res.send(file)
  }catch(err)
  {console.log(err);}
}
 

async function Put_Config(req, res, next) {


  // const module_id =  req.body?.params?.module_id
  // const set_ShowInUi_to =  req.body?.params?.set_ShowInUi_to

 const config = req.body.config
console.log("config",config);
 
  try{
 
    // const file = await put_full_config_model()  
//  res.send(file)
  }catch(err)
  {console.log(err);}
}
 
 
module.exports = {

  Get_Config,
  Put_Config
 
};
