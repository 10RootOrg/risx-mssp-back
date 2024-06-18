const router = require('express').Router();

const ResultsController  = require('../controllers/ResultsController');


router.get('/get_all_requests_table', ResultsController.get_all_requests_table);  
 router.get('/velociraptor-single-result', ResultsController.get_single_velociraptor_response);  
 router.get('/count-responses-files', ResultsController.count_velociraptor_responses);  


 router.get('/get_all_latest_results_dates', ResultsController.get_all_latest_results_dates);  
//  

 router.get('/check_last_req_and_res_for_module', ResultsController.check_last_req_and_res_for_module);  /// check to delete



 



 /// its for test
//  router.post('/write_to_csv', ResultsController.write_to_csv);  
// router.get('/all-request-and-response', ResultsController.get_all_request_and_response);  
//  router.get('/all-velociraptor-results', ResultsController.get_all_velociraptor_responses_file_list);  

 


module.exports = router;
