const env = process.env.NODE_ENV

let MY_SQL_CONF = {}
let REDIS_CONF = {}

if(env === 'dev') {
    MY_SQL_CONF = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'admin',
        database: 'myblog'
    }

    REDIS_CONF = {
        port: 6379,
        host: "127.0.0.1"
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

    REDIS_CONF = {
        port: 6379,
        host: "127.0.0.1"
    }
}


module.exports = {
    MY_SQL_CONF,
    REDIS_CONF,
}