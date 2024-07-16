// const DatabaseError = require('../errors/DatabaseError');
const { log } = require('console');
const fs = require('fs');
const fs_promises = require('fs').promises; // Import 'fs' with Promise-based API
 const  path = require('path');
  const pathToTmpJson  = path.resolve(__dirname,'../tmpjsons/ResourceGroup-websites.json')
  const DBConnection = require('../db.js')
  const { exec } = require('child_process');


  








  async function get_config_path_model(){

    try {
      const configFileName = `config.json`;

      // let directory;
      let path_to_config;
    
      if (process.env.NODE_ENV === 'development') {
        path_to_config = path.join(__dirname, '..', '..', 'risx-mssp-front', `public`, configFileName);
        return path_to_config;
      } else if (process.env.NODE_ENV === 'production') {
        path_to_config = path.join(__dirname, '..', '..', 'risx-mssp-front-build', configFileName);
        return path_to_config;
      }
    
    
 
    } catch (err) {
      console.error('Error reading or parsing file:', err);
    }
    
    
    
    
    
    
    } 
    async function read_config_model(file_path ) {
      try {
       const data = await fs_promises.readFile(file_path, 'utf8');
       const jsonData = JSON.parse(data);
        
       return jsonData;
   } catch (err) {
       console.error('Error reading file:', err);
       throw err; // Rethrow the error
   }
   
   
    }




    async function get_All_Resources_model() {
      try {
        const resource_types = await DBConnection('resource_type').select('resource_type_id');
    
        // Fetch all resources
        const resourcesQuery = DBConnection('all_resources')
          .select(
            'all_resources.resource_id',
            'all_resources.resource_string',
            'all_resources.description',
            'all_resources.resource_status',
            'all_resources.monitoring',
            'all_resources.group_name',
            'all_resources.checked',
            'all_resources.updatedAt',
            'all_resources.type',
            DBConnection.raw('JSON_ARRAYAGG(JSON_OBJECT("Toolid", tools.tool_id, "toolname", tools.Tool_name)) as tools')
          )
          .leftJoin('tools', function () {
            this.on(DBConnection.raw('FIND_IN_SET(tools.tool_id, REPLACE(all_resources.tools, " ", ""))'));
          })
          .groupBy('all_resources.resource_id');
    
        const [resources] = await Promise.all([resourcesQuery]);
    
        // Initialize the final object with all resource_type_ids as keys
        const groupedResources = resource_types.reduce((acc, resourceType) => {
          acc[resourceType.resource_type_id] = [];
          return acc;
        }, {});
    
        // Group resources by their type
        resources.forEach(resource => {
          const typeIds = resource.type.split(',');
          typeIds.forEach(typeId => {
            if (groupedResources[typeId]) {
              groupedResources[typeId].push({
                ...resource 
              });
            }
          });
        });
    
        // Log each resource_type_id for debugging purposes
        resource_types.forEach(resourceType => {
          console.log("resource_type_id:", resourceType.resource_type_id);
        });
    
    
        console.log("44444444444444444",groupedResources);
        return groupedResources;
      } catch (err) {
        console.log("get_All_Resources_model err", err);
      }
    
    
    
    
      // try {
      //   const resourcesQuery = DBConnection('all_resources')
      //   .select('all_resources.resource_id', 'all_resources.resource_string', 'all_resources.description', 'all_resources.resource_status', 'all_resources.monitoring', 'all_resources.group_name', 'all_resources.checked', 'all_resources.updatedAt',
      //     DBConnection.raw('JSON_ARRAYAGG(JSON_OBJECT("Toolid", tools.tool_id, "toolname", tools.Tool_name)) as tools'),
      //     DBConnection.raw('(SELECT JSON_ARRAYAGG(JSON_OBJECT("resource_type_id", resource_type.resource_type_id, "resource_type_name", resource_type.resource_type_name)) FROM (SELECT DISTINCT resource_type.resource_type_id, resource_type.resource_type_name FROM resource_type WHERE FIND_IN_SET(resource_type.resource_type_id, all_resources.type)) AS resource_type) AS types')
      //   )
      //   .leftJoin('tools', function () {
      //     this.on(DBConnection.raw('FIND_IN_SET(tools.tool_id, REPLACE(all_resources.tools, " ", ""))'));
      //   })
      //   .groupBy('all_resources.resource_id');
    
      //   const [resources    ] = await Promise.all([resourcesQuery ]);
      //   if (resources){return resources}
      //   // res.send(resources);
      // } catch (err) {
      //   console.log("get_All_Resources_model err",err);
      // }
    
    
    
    
    
      
    }

// async function get_All_Resources_model() {




//   try{
   
//     const All_Resources  = await DBConnection('all_resources')
//     .select('*')
//    if (All_Resources){return All_Resources}
//  console.log("All_Resources",All_Resources);
// }catch(err)
  
// {console.log("get_All_Resource_Type_model", err);}






  
// }


async function get_All_Resource_Type_model() {
  console.log("get_All_Resource_Type_model 11111111111111");

  try{
   
    const resourcesQuery  = await DBConnection('resource_type')
    .select('resource_type_id','resource_type_name','description_short')
   if (resourcesQuery){return resourcesQuery}
 
}catch(err)
  
{console.log("get_All_Resource_Type_model", err);}




  
}

async function Count_From_Same_Type_model(AllResourceType ,All_Resources){
  // console.log("Count_From_Same_Type_model" ,All_Resources);
try{ 

console.log(AllResourceType);
  for (let j = 0; j < All_Resources.length; j++) {
    const xxx =  All_Resources[j]?.types
   console.log("xxx", xxx);
  }
  
  


  // מכין אריי של סוגי ריסוריס [2001,2002,2003[ 
const type_ids_list =[]
for (let i = 0; i < AllResourceType.length; i++) {
  const type_id =  AllResourceType[i]?.resource_type_id
 type_ids_list.push(type_id)
}


console.log("type_ids_list" , type_ids_list);


return "Shoko Banana"
 }
catch(err)
  
{console.log("Count_From_Same_Type_model", err);}

}


async function Make_Array_to_count_Resorce_by_type(AllResourceType) {


  try{
   
    const resourcesCount = await DBConnection('all_resources').select('type');

    const list_tagged_types = [];
    
 resourcesCount.forEach((element) => {
if (element?.type === null ){return}
const type = element?.type.split(',').map(tag => tag.trim());

 list_tagged_types.push(...type);
    });
    
 AllResourceType.forEach((element) => {
  if (element?.resource_type_id === null ){return}
const type_id = element?.resource_type_id
const count = list_tagged_types.filter(item => item === type_id).length; // 6
element.count = count


  });
return AllResourceType

 
}catch(err)
  
{console.log("get_All_Resource_Type_model_00", err);}




  
}

async function check_if_string_exist_in_db(resource_string){
  console.log("resource_string", resource_string);
  try{

    if (resource_string == undefined ||  resource_string == null ){return null}

const exist = await DBConnection('all_resources').select('resource_string')
.where('resource_string', '=', resource_string);
if (exist?.length === 0) {console.log("no exist");return false}
else if ( exist?.length != 0) {console.log("exist"  );return true}

  }catch(err){console.log(err);}
}
async function check_if_id_exist_in_db(resource_id){
  console.log("resource_id", resource_id);
  try{

    if (resource_id == undefined ||  resource_id == null ){return null}

const exist = await DBConnection('all_resources').select('resource_id')
.where('resource_id', '=', resource_id);
if (exist?.length === 0) {console.log("no exist");return false}
else if ( exist?.length != 0) {console.log("exist"  );return true}

  }catch(err){console.log(err);}
}


async function delete_single_resource_by_id(resource_id){
  console.log("delete_single_resource_by_id", resource_id);

  try{

const deleted = await DBConnection('all_resources')
.where('resource_id', '=', resource_id).del();

if (deleted) {console.log("no exist",deleted);return true}
else    {console.log("exist",deleted  );return false}

  }catch(err){console.log(err);}
}


module.exports = {
  get_All_Resources_model,
  get_All_Resource_Type_model,
  Count_From_Same_Type_model,
  Make_Array_to_count_Resorce_by_type,
  check_if_string_exist_in_db,
  check_if_id_exist_in_db,
  delete_single_resource_by_id,
  get_config_path_model,
  read_config_model
};
