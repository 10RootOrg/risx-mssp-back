
 const { get_full_config_model  } = require('../models/ConfigModels');

async function Get_Config(req, res, next) {
  try{
 
    const file = await get_full_config_model()  
 res.send(file)
  }catch(err)
  {console.log(err);}
}
 
 
module.exports = {

  Get_Config
 
};
