const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    password:"root",
    host:"localhost",
    port:5433,
    database:"PernToDo"
});

module.exports = pool;