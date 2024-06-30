const router = require('express').Router();

const UsersController  = require('../controllers/UsersController');
 
console.log("UsersController");


router.get('/',              UsersController.Get_all_users);  //get all users
 
module.exports = router;


 