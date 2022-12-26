const Pool = require('pg').Pool
const pool = new Pool({
  user: 'api_pract',
  host: 'localhost',
  database: 'practica',
  password: 'root',
  port: 5432,
});

module.exports = pool