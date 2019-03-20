var express = require('express');
var router = express.Router();
var {login} = require('../controller/user.js')
var {ErrorModel, SuccessModel} = require('../model/resModel')

/* GET home page. */
router.post('/login', function(req, res, next) {
    let {username, password} = req.body;

    let result = login(username, password);
    return result.then(data => {
        if(data.username) {
            req.session.username = data.username;
            req.session.realname = data.realname;
            res.json(
                new SuccessModel()
            )
            return;
        }
        res.json(
            new ErrorModel('登录失败')
        )    
    })
});
router.get('/login-test', function(req, res, next) {
    console.log('req.session', req.session);
    if(req.session.username) {
        res.json({
            msg: '已经登录',
            username: req.session.username
        })
        return
    }
    res.json({
        msg: '未登录',
        errno: -1,
    }) 
});
// router.get('/session-test', function(req, res, next) {
//     if(req.session.count == null) {
//         req.session.count = 0;
//     }
//     req.session.count++;
//     res.json({
//         errno: 0,
//         data: {
//             count: req.session.count
//         }
//     })
// });

module.exports = router;