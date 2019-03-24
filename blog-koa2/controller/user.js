const { exec, escape } = require('../db/mysql.js');
const { genPassword } = require('../utils/encrypt')

const login = async (username, password) => {
    username = escape(username)

    //加密密码
    password = genPassword(password)
    password = escape(password)

    let sql = `select * from user where username = ${username} and password = ${password}`
    let result = await exec(sql);
    return res[0] || {};
    
   
}

module.exports = {
    login,
}