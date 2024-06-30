const { Get_all_users_model } = require('../models/UsersModels');
//  const DBConnection = require('../db.js')
 
async function Get_all_users(req, res, next) {
  console.log("Get_all_users");
  try{
 
    const all = await Get_all_users_model()  
 res.send(all)
  }catch(err)
  {console.log(err);}
}
 
 
 

 

module.exports = {
 Get_all_users,
};
