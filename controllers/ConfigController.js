
 const { get_full_config_model ,put_full_config_model  } = require('../models/ConfigModels');
 const DBConnection = require('../db.js')
 
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
    console.log("put",put);


  if(put === 1){
    res.status(200).send("Updated successfully");
  }

else{
  res.status(500).send("Internal Server Error");
}


  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}
 

async function Get_From_ENV(req, res, next) {

  let data ={
    FRONT_IP:"",
    other:"",
  }

  try{
    const FRONT_IP = process.env.FRONT_IP;
 
    data ={
      FRONT_IP:FRONT_IP,
      other:"",
    }

  
 res.send(data);
  }catch(err)
  {console.log(err);}
}
 
 

 

module.exports = {

  Get_Config,
  Put_Config,
  Get_From_ENV
};
