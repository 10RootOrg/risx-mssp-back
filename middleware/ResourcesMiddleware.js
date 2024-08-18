const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}



const { does_Website_Name_Exist_Model, does_Website_Id_Exist_Model ,check_if_string_exist_in_db, check_if_id_exist_in_db} = require('../models/ResourcesModels')

function validateBody(schema){
  

return (req, res, next)=>{

  const valid = ajv.validate(schema, req.body)

// console.log("start   validation body", req.body);

  if (!valid) {console.log(ajv?.errors[0]?.message)

     console.log(`In field ${ajv?.errors[0]?.message} In field ${ajv?.errors[0]?.instancePath}`);
  // return res.status(400).send(ajv?.errors[0]?.message)
  return res.status(400).send(`${ajv?.errors[0]?.message} In field ${ajv?.errors[0]?.instancePath}`)
}
next()
}

}
async function Check_if_resource_exists_to_avoid_duplication(req,res,next){

  
  const {resource_string , item_types_list} = req.body 
 

  console.log("item_types_list" ,item_types_list);
 


  const exist =  await check_if_string_exist_in_db(resource_string ,item_types_list)
  if (exist){
   res.status(400).send(`Asset named "${resource_string}" already exists for this type.`);

    console.log("This Asset is already in this type");return}
 next()
 
 
 }
 
 async function Check_if_resource_id_exists_to_continue(req,res,next){
 
  
   const {resource_id} = req.body 
  
   const exist =  await check_if_id_exist_in_db(resource_id)

   if (!exist){
      res.status(400).send("Resource id not exists") 
     console.log("Resource id not exists");return}
  next()
  
  
  }


function Check_if_website_name_exists_to_avoid_duplication(req,res,next){
    console.log("inside the middleware  --  Check_if_website_name_exists_to_avoid_duplication"  );

   
    const {Name} = req.body;
    console.log("got it from reg.body" , Name);
    const sitename = does_Website_Name_Exist_Model(Name)
   console.log("the anwser from model " , sitename);

if(sitename){
    console.log("sitename is already exists");
   res.status(400).send("sitename is already exists") 
   return
}

  next()


}


function Check_if_website_id_exists(req,res,next){  
   const {id} = req.params 
    const siteId= does_Website_Id_Exist_Model(id)
   console.log("the anwser from model " , siteId);

if(!siteId){
console.log("siteId  not exists");
res.status(400).send("siteId not exists") 
   return
}

  next()


}


 

module.exports = {
    Check_if_website_name_exists_to_avoid_duplication,
    Check_if_website_id_exists,
    validateBody,
    Check_if_resource_exists_to_avoid_duplication,
    Check_if_resource_id_exists_to_continue
}