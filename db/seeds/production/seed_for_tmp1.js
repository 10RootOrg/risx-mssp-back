const { log } = require('console');
const fs = require('fs');  // Import 'fs' with Promise-based API
const path = require('path');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// exports.seed = async function(knex) {
//     // Deletes ALL existing entries
//     const started_config = await fs.readFileSync("./config_seed.json");
//     const parsedJSON =  JSON.parse(started_config);


//     await knex('tmp1').del()
//     await knex('tmp1').insert( 
     
//       {
//          config:JSON.stringify(parsedJSON),
//          lastupdated:new Date
//   }
   
//    );
//   };



  exports.seed = async function(knex) {

    const filePath = path.join(__dirname, '..','production', 'config_seed.json');
    const configData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Insert the data into the table
    await knex('tmp1').insert({
      config: JSON.stringify(configData),
      lastupdate:new Date
    });  
  };