
 const { get_full_config_model ,put_full_config_model ,check_main_process_status_model} = require('../models/ConfigModels');

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
 


async function Check_Interval_Status(req, res, next) {
  try{
 
//     const momo = "3333"
//  res.send(momo)

    const bobo =  await  check_main_process_status_model().then(isRunning => {
      console.log('Process running status:', isRunning)
      res.send(isRunning);


   
  }).catch(error => {
      console.error('Error:', error);res.send("sssssssssssssssssss"); next(error);
  });

  if (bobo){      console.log('isRunning bobo ', isRunning,"sssssss",bobo );
    res.send("koko")
  }


  }catch(err)
  {console.log(err);}

  // try {
 
    // const process_status = await check_main_process_status_model();

  //   const bobo =  await  check_main_process_status_model().then(isRunning => {
  //     console.log('Process running status:', isRunning);
  //     //  res.send(isRunning)
  //      ;
  //     if (bobo){      console.log('isRunning bobo ', isRunning,"sssssss",bobo );}
  // }).catch(error => {
  //     console.error('Error:', error);res.send("sssssssssssssssssss"); next(error);
  // });


}

 

module.exports = {

  Get_Config,
  Put_Config,
  Check_Interval_Status
};
