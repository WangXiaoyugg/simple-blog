const {loginCheck} = require("../controller/user")
const {SuccessModel, ErrorModel} = require("../model/resModel")

const handleUserRouter = (req, res) => {
    const method = req.method
    
    if(method === 'POST' && req.path === '/api/user/login') {
        let {username, password} = req.body;
        let result = loginCheck(username, password);
        return result.then(res => {
            if(res.username) {
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

}

module.exports = handleUserRouter;