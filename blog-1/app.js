const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const notFoundHandler = require('./src/router/404.js')

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
    let cookies = {}
    req.headers.cookie && req.headers.cookie.split(";").forEach(item => {
        let keyVal = item.split("=");
        
        key = keyVal[0].trim()
        val = keyVal[1].trim()
        console.log(key, val);
        cookies[key] = val;
    })
    req.cookies = cookies;

    // 处理postData
    getPostData(req).then((postData) => {
        req.body = postData;

        let blogResult = handleBlogRouter(req, res);
        if(blogResult) {
            blogResult.then((blogData) => {
                res.end(JSON.stringify(blogData));
            })
            return;
        }

        let userResult = handleUserRouter(req, res);
        if(userResult) {
            userResult.then((userData) => {
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