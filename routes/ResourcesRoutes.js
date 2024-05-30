const router = require('express').Router();

const ResourcesController  = require('../controllers/ResourcesController');
 
const {
    validateBody,
     Check_if_website_name_exists_to_avoid_duplication,
     Check_if_website_id_exists,
     Check_if_resource_exists_to_avoid_duplication,
     Check_if_resource_id_exists_to_continue
    
    } = require('../middleware/ResourcesMiddleware')
const{post_resource_schema} = require('../schema/Resource_schema')

 router.get('/', ResourcesController.get_All_Resources);  //get all the Resources

 router.get('/all-resource-filtered', ResourcesController.get_All_Resources_filtered);  //get All Resources filtered

 router.get('/all-resource-type', ResourcesController.getAllResourceType);  //get resource type

 router.get('/count-same-type', ResourcesController.Count_From_Same_Type);  // COUNT TIMES SAME RESOURCE TYPE EXISTING IN TABLE

 router.post('/' , [validateBody(post_resource_schema)],Check_if_resource_exists_to_avoid_duplication, ResourcesController.post_new_resource);

 router.put('/' , [validateBody(post_resource_schema)],Check_if_resource_id_exists_to_continue, ResourcesController.edit_resource);

 router.delete('/:resource_id', ResourcesController.delete_single_resource);  //delete_single resorce

//  router.post('/',[validateBody(websiteSchema),  Check_if_website_name_exists_to_avoid_duplication] , ResourcesController.postNew_website);


 
//  router.delete('/:id',[Check_if_website_id_exists] , ResourcesController.delete_website);

//  router.get('/default-columns',ResourcesController.getDefaultColumns);

 
module.exports = router;
