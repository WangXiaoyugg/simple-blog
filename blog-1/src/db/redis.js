const redis = require('redis')
const { REDIS_CONF } = require("../config/db")

const redisClient = redis.createClient(REDIS_CONF);
redis.on('error', (err) => {
    console.log("redis error\n", err)
})

function set(key, val) {
    if(!key || !val) {
        throw new Error("redis set key or val not empty!")
        return;
    }
    if(typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}


function get(key) {
    const promise = new Promise((resolve, reject) => {
        if(!key) {
            reject("key can't be empty")
        }

        redisClient.get(key, (err,val) => {
            if(err) {
                reject(err)
                return;
            }
            if(val === null) {
                resolve(null)
                return;
            }

            try {
                resolve(JSON.parse(val))
            }catch(ex) {
                resolve(val)
            }
        })
    })

    return promise
}


module.exports = {
    set,
    get,
}