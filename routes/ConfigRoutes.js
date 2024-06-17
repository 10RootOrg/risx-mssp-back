const router = require('express').Router();

const ConfigController  = require('../controllers/ConfigController');
 
router.get('/',               ConfigController.Get_Config);  //get the config file
router.put('/',               ConfigController.Put_Config);  //get the config file
router.get('/process-status', ConfigController.Check_Interval_Status);  

module.exports = router;


 