
 const { check_main_process_status_model , active_manual_process_model,active_interval_process_model,search_And_Kill_Process} = require('../models/ProcessModels');






 async function check_and_active_interval(req, res, next) {

 
  try{ 

const checkRunning =  await  check_main_process_status_model().then(isRunning => {
 console.log('Process running status:', isRunning)
 return false
  }).catch(error => {
      console.error('Error:', error);   return error;  
  });


  if (checkRunning){      console.log("checkRunning === true",checkRunning );
      return checkRunning
  }
  if (checkRunning === false){ 
         console.log('checkRunning  === false , start running the interval'   );
 
 const now_active = await  active_interval_process_model().then(isActive => {
  console.log('isActive', isActive)
if      (isActive === true) {res.send(true);}
else if(isActive === false) { res.send("Error");}


}).catch(error => {
  console.error('Error:', error);res.send(false); next(error);
});
   
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
async function kill_interval_of_python(req, res, next) {


  const file_name = process.env.PYTHON_INTERVAL; // Name of the Python process to search for

  console.log("kill_interval_of_python 00" ,file_name);
  try {
    const success = await search_And_Kill_Process(file_name);
    if (success) {
    
        res.status(200).json({ message: 'Process(es) killed successfully.' });
    } else {
        res.status(404).json({ message: 'No matching processes found to kill.' });
    }
} catch (err) {
    res.status(500).json({ message: `Failed to kill process: ${err.message}` });
}
 

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
    res.send(true)
  }
  if (bobo === false){      console.log('bobo === false'   );
    res.send(false)
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




async function active_manual_process(req,res,next){
  console.log("active_manual_process"  );
  // const param1 =  req.query.param1

 

  await  active_manual_process_model().then(isRunning => {
  console.log('active_manual_process_model:', isRunning)
if      (isRunning === true) {res.send(true);}
else if(isRunning === false) { res.send("Error");}
 


}).catch(error => {
  console.error('Error:', error);res.send(false); next(error);
});


// if (doit === false){
//   console.log("active_manual_process_model 1" ,doit);
//   res.send("Error")
// }
  

//  const isActive = await active_manual_process_model();

 
//   console.log("isActive" , isActive);
//   res.send(isActive)  
 
   
  } 







module.exports = {

  Check_Interval_Status,
  active_manual_process,
  check_and_active_interval,
  kill_interval_of_python
};
// const isActive =  await  active_manual_process_model().then(isRunning => {
//   console.log('Process running status 22222222222222222222222222222222:', isRunning)
//   res.send(isRunning);



// }).catch(error => {
//   console.error('Error:', error);res.send("sssssssssssssssssss"); next(error);
// });

// if (isActive){      console.log('isRunning bobo ', isRunning,"sssssss",isActive );
// res.send("koko")
// }