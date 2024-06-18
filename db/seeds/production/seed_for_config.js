const fs = require('fs');  // Import 'fs' with Promise-based API


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    const started_config = await fs.readFileSync("./config_seed.json");
    const parsedJSON =  JSON.parse(started_config);


    await knex('configjson').del()
    await knex('configjson').insert([
     
      {
         config:JSON.stringify(parsedJSON),
         lastupdated:new Date,
  }, 
   
    ]);
  };
  
  
  
   