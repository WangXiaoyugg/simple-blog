const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const notFoundHandler = require('./src/router/404.js')

const {set, get} = require("./src/db/redis")

const getCookieExpire = () => {
    let date = new Date()
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
    return date.toGMTString();
}

// 定义session_data 存储 session信息
const SESSION_DATA = {}


const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = '';
        req.on("data", (chunk) => {
            postData += chunk
        })
        req.on("end", () => {
            if(!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData.toString()))
        })
    })

    return promise
}



const serverHandle = (req, res) => {
    // 设置返回JSON格式
    res.setHeader("Content-Type", "application/json")
    
    // 提取公用的path
    req.path = req.url.split('?')[0];

    // 解析query
    req.query = querystring.parse(req.url.split("?")[1]);

    // 解析cookie 
    req.cookies = {}
    req.headers.cookie && req.headers.cookie.split(";").forEach(item => {
        if(!item) return;
        let keyVal = item.split("=");
        key = keyVal[0].trim()
        val = keyVal[1].trim()
        req.cookies[key] = val;
    })


    // 解析 session
    // let needSetCookie = false;
    // let userId = req.cookies['userid'];
    // if(userId) {
    //     if(!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}     
    //     } 
    // } else {
    //     needSetCookie = true;
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]


    // 解析 session, 使用redis连接
    let needSetCookie = false;
    let userId = req.cookies.userid;
    if(!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 redis 中的 session
        set(userId, {});
    }
    // userId 存在
    req.sessionId = userId;
    get(req.sessionId).then((sessionData) => {
        if(sessionData == null) {

            // 初始化 reids session
            set(req.sessionId, {})
            req.session = {}
        } else {
            // 设置session
            req.session = sessionData;

        }
        return getPostData(req);
    })
    .then((postData) => {
        // 处理postData
        req.body = postData;

        let blogResult = handleBlogRouter(req, res);
        if(blogResult) {
            blogResult.then((blogData) => {
                if(needSetCookie) {
                    res.setHeader("Set-Cookie", `userid=${userId};path=/;httpOnly;expires=${getCookieExpire()}`);
                }
                res.end(JSON.stringify(blogData));
            })
            return;
        }

        let userResult = handleUserRouter(req, res);
        if(userResult) {
            userResult.then((userData) => {
                if(needSetCookie) {
                    res.setHeader("Set-Cookie", `userid=${userId};path=/;httpOnly;expires=${getCookieExpire()}`);
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

    notFoundHandler(req, res);

    })

    

    
}

module.exports = serverHandle;