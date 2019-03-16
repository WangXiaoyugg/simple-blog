const redis = require('redis')
const redisClient = redis.createClient({
    port: 6379,
    host: '127.0.0.1',
})

redisClient.on("error", (err) => {
    console.log(err)
})

redisClient.set("myname", "garen", redis.print)
redisClient.get("myname", (err, val) => {
    if(err) {
        console.log(err)
        return;
    }
    console.log(val)
    redisClient.quit();
})