const {login} = require("../controller/user")
const {SuccessModel, ErrorModel} = require("../model/resModel")
const {set} = require("../db/redis")

const handleUserRouter = (req, res) => {
    const method = req.method
    
    if(method === 'POST' && req.path === '/api/user/login') {
        let {username, password} = req.body;

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



}

module.exports = handleUserRouter;