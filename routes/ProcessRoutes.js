const router = require('express').Router();
 
const ProcessController  = require('../controllers/ProcessController');




router.get('/check-and-active-interval-of-python',       ProcessController.check_and_active_interval);  
router.get('/process-status',                            ProcessController.Check_Interval_Status);  
router.get('/active-manual-process',                     ProcessController.active_manual_process);  

module.exports = router;


 