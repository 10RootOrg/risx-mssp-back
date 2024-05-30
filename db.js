const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const DBConnection = require('knex')(config);
 
module.exports = DBConnection;