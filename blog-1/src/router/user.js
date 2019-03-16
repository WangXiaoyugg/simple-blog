const {login} = require("../controller/user")
const {SuccessModel, ErrorModel} = require("../model/resModel")

const getCookieExpire = () => {
    let date = new Date()
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
    return date.toGMTString();
}

const handleUserRouter = (req, res) => {
    const method = req.method
    
    if(method === 'GET' && req.path === '/api/user/login') {
        // let {username, password} = req.body;
        let {username, password} = req.query;

        let result = login(username, password);
        return result.then(data => {
            if(data.username) {
                res.setHeader("Set-Cookie", `username=${data.username};path=/;httpOnly;expires=${getCookieExpire()}`);
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

    // 用于测试cookie 是否被修改
    if(method === 'GET' && req.path === '/api/user/login-test') {
        let {username, password} = req.query;
        if(req.cookies.username) {
            return Promise.resolve(new SuccessModel({
                data: req.cookies
            }))
        } 
        return Promise.resolve(new ErrorModel("登录失败"))
    }

}

module.exports = handleUserRouter;