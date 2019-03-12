const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const notFoundHandler = require('./src/router/404.js')

const serverHandle = (req, res) => {
    // 设置返回JSON格式
    res.setHeader("Content-Type", "application/json")
    
    // 提取公用的path
    req.path = req.url.split('?')[0];

    let blogData = handleBlogRouter(req, res);
    if(blogData) {
        res.end(JSON.stringify(blogData));
        return;
    }

    let userData = handleUserRouter(req, res);
    if(userData) {
        res.end(
            JSON.stringify(userData)
        )
        return
    }

    notFoundHandler(req, res);

    
}

module.exports = serverHandle;