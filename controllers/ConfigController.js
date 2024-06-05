
 const { get_full_config_model ,put_full_config_model } = require('../models/ConfigModels');

async function Get_Config(req, res, next) {
  try{
 
    const file = await get_full_config_model()  
 res.send(file)
  }catch(err)
  {console.log(err);}
}
 

async function Put_Config(req, res, next) {


 const config = req.body.config
 
  try{
 
    const put = await put_full_config_model(config)  
 res.send(put)
  }catch(err)
  {console.log(err);}
}
 
 
module.exports = {

  Get_Config,
  Put_Config
 
};
