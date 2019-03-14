const mysql = require('mysql')
const config = require('../config/db.js')

const connection = mysql.createConnection(config);

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
}