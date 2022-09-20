const mysql = require("mysql");

let pool;
getPool = () => {
    if (pool) {
        return pool
    } else {
        pool = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DB_NAME
        })
        return pool
    }
}

module.exports = getPool;