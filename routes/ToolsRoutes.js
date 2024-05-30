const router = require('express').Router();

const ToolsController  = require('../controllers/ToolsController');
const {Check_if_have_the_correct_data} = require('../middleware/ToolsMiddleware')



router.get('/',                           ToolsController.Get_All_Tools);  //get all the Resources
router.get('/all-velociraptor_artifacts', ToolsController.get_all_velociraptor_artifacts);  //get all the Resources
router.get('/dehashed-json',              ToolsController.Get_Dehashed_Json); 
router.get('/active-velociraptor-artifact',ToolsController.active_velocirapto_artifact); 


router.get('/active-module', Check_if_have_the_correct_data,   ToolsController.active_modules )



 

 
module.exports = router;



 
// const {
//     validateBody,
//      Check_if_website_name_exists_to_avoid_duplication,
//      Check_if_website_id_exists
    
//     } = require('../middleware/ResourcesMiddleware')
// const{websiteSchema} = require('../schema/Resource_schema')

//  router.post('/',[validateBody(websiteSchema),  Check_if_website_name_exists_to_avoid_duplication] , ResourcesController.postNew_website);
 
//  router.delete('/:id',[Check_if_website_id_exists] , ResourcesController.delete_website);

 
