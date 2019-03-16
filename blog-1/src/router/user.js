const {login} = require("../controller/user")
const {SuccessModel, ErrorModel} = require("../model/resModel")
const {set} = require("../db/redis")

const handleUserRouter = (req, res) => {
    const method = req.method
    
    if(method === 'GET' && req.path === '/api/user/login') {
        // let {username, password} = req.body;
        let {username, password} = req.query;

        let result = login(username, password);
        return result.then(data => {
            if(data.username) {
                req.session.username = data.username;
                req.session.realname = data.realname;
                // 同步到redis 中
                set(req.sessionId, req.session);
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

    // 用于测试cookie 是否被修改
    if(method === 'GET' && req.path === '/api/user/login-test') {
        let {username, password} = req.query;
        if(req.session.username) {
            return Promise.resolve(new SuccessModel({
                session:req.session
            }))
        } 
        return Promise.resolve(new ErrorModel("登录失败"))
    }

}

module.exports = handleUserRouter;