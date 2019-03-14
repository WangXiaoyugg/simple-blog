const env = process.env.NODE_ENV

let MY_SQL_CONF = {}

if(env === 'dev') {
    MY_SQL_CONF = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'admin',
        database: 'myblog'
    }
}

if(env === 'prod') {
    MY_SQL_CONF = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'admin',
        database: 'myblog'
    }
}


module.exports = {
    MY_SQL_CONF
}