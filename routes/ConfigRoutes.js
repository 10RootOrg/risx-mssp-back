const router = require('express').Router();

const ConfigController  = require('../controllers/ConfigController');
 
router.get('/',ConfigController.Get_Config);  //get the config file
 

 
module.exports = router;


 