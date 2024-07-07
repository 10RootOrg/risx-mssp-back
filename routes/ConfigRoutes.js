const router = require('express').Router();

const ConfigController  = require('../controllers/ConfigController');
 
router.get('/',               ConfigController.Get_Config);  //get the config file
router.put('/',               ConfigController.Put_Config);  //get the config file



router.get('/from_env',               ConfigController.Get_From_ENV);  //get from env to front
module.exports = router;


 