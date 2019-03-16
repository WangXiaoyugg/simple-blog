const { exec } = require('../db/mysql.js');
const login = (username, password) => {
    let sql = `select * from user where username = '${username}' and password = '${password}'`

    return exec(sql).then((res) => {
        return res[0] || {}
    })
   
}

module.exports = {
    login,
}