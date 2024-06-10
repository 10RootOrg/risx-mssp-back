const router = require('express').Router();

const ToolsController  = require('../controllers/ToolsController');

const {Check_if_have_the_correct_data} = require('../middleware/ToolsMiddleware')


//get info
router.get('/',                           ToolsController.Get_All_Tools);  //get all the Resources
router.get('/all-velociraptor_artifacts', ToolsController.get_all_velociraptor_artifacts);  //get all the Resources

//put
router.put('/enable-disable',          ToolsController.enable_disable_module); 
router.put('/show-in-ui',              ToolsController.show_in_ui_module); 
 
 //active modules 
 router.get('/dehashed-json',              ToolsController.Get_Dehashed_Json); 

 router.get('/active-main-process',ToolsController.active_main_process);  ///check to delete 

router.get('/active-velociraptor-artifact',ToolsController.active_velocirapto_artifact);  ///check to delete 
router.get('/active-module', Check_if_have_the_correct_data,   ToolsController.active_modules ) ///check to delete



 

 
module.exports = router;




 
