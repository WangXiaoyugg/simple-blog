const mysql = require('mysql')
const { MY_SQL_CONF } = require('../config/db.js')

const connection = mysql.createConnection(MY_SQL_CONF);

connection.connect()

function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) {
                reject(err);
                return
            }
            resolve(result)
        })
    })
    return promise;
}

module.exports = {
    exec,
    escape: mysql.escape
}