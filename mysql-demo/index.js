const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'myblog'
})

connection.connect();

let sql = `insert into user (username, password, realname )values ('王五', '456789', '王晓武') `;
connection.query(sql, (err, result) => {
    if(err) {
        console.log(err);
        return
    }
    console.log(result)
})

connection.end()