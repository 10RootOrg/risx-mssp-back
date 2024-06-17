const router = require('express').Router();
 
const ProcessController  = require('../controllers/ProcessController');
router.get('/process-status',       ProcessController.Check_Interval_Status);  
router.get('/active-manual-process',ProcessController.active_manual_process);  

module.exports = router;


 