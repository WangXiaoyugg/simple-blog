const express = require("express")
const app = express();
/**
 * 1. 直接访问 GET /api/get-cookie, 会经过 请求开始 -> 设置cookie -> 写req.body -> 处理api路由 -> get 处理 /api/get-cookie
 * 2. POST /api/get-cookie, 会经过 请求开始 -> 设置cookie -> 写req.body -> 处理api路由 -> post 处理 /api/get-cookie
 * 3. 访问不存在的路由1 /api/xxx 会经过 请求开始 -> 设置cookie -> 写req.body -> 处理api路由 -> 处理404
 * 4. 访问不存在的路由2 /xxx 会经过 请求开始 -> 设置cookie -> 写req.body  -> 处理404  
 * 5. 路由可以支持多个中间件，loginCheck
 */
app.use((req,res, next) => {
   console.log('请求开始...', req.method, req.url) 
   next()
})

app.use((req, res, next) => {
    req.cookie = {
        userId: 'abc123'
    }
    console.log('req.cookie', req.cookie)
    next()
})

app.use((req,res, next) => {
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200,
        }
        console.log('req.body ', req.body)
        next()
    })
})

app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由')
    next()
})

app.get('/api', (req, res, next) => {
    console.log('get /api 路由')
    next()
})
app.post('/api', (req, res, next) => {
    console.log('post /api 路由')
    next()
})

function loginCheck(req, res, next) {
    setTimeout(() => {
        // console.log('登录失败')
        // res.json({
        //     errno: -1,
        //     msg: '登录失败'
        // })

        console.log('模拟登录成功')
        next()
    })
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/get-cookie')
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.post('/api/get-cookie', (req, res, next) => {
    console.log('post /api/get-cookie')
    res.json({
        errno: 0,
        data: req.body
    })
})

app.use((req, res, next) => {
    console.log('处理 404')
    res.json({
        errno: -1,
        msg: '404 not Found!'
    })
})

app.listen(3000, () => {
    console.log('server is start at localhost:3000')
})