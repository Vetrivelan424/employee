const knex = require('knex');
const CONFIG = require('../config/config');

const db = knex({
  client: 'mysql',
  connection: {
    host: CONFIG.DB_HOST,
    user: CONFIG.DB_USER,
    password: CONFIG.DB_PASS,
    database: CONFIG.DB_DATABASE,
    timezone: "+00:00",
    charset: 'utf8',
    port: 3306  
  },
  pool: { min: 0, max: 100 }, // Adjust as needed
});

module.exports.db = db;
