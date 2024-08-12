const router = require('express').Router();

const ResultsController  = require('../controllers/ResultsController');


router.get('/get_all_requests_table', ResultsController.get_all_requests_table);  
 router.get('/velociraptor-single-result', ResultsController.get_single_velociraptor_response);  
 router.get('/download-json-file', ResultsController.download_json_file);


 router.get('/velociraptor-aggregate-macro', ResultsController.get_velociraptor_aggregate_macro);  
 router.get('/check_last_req_and_res_for_module', ResultsController.check_last_req_and_res_for_module);  /// check to delete

 router.delete('/delete-results-by-ids/', ResultsController.delete_results);

//  router.get('/count-responses-files', ResultsController.count_velociraptor_responses);  


//  router.get('/get_all_latest_results_dates', ResultsController.get_all_latest_results_dates);  
//  
 



 /// its for test
//  router.post('/write_to_csv', ResultsController.write_to_csv);  
// router.get('/all-request-and-response', ResultsController.get_all_request_and_response);  
//  router.get('/all-velociraptor-results', ResultsController.get_all_velociraptor_responses_file_list);  

 


module.exports = router;
