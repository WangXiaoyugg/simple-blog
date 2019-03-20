var express = require('express');
var router = express.Router();

const { 
    getList, 
    getDetail, 
    newBlog, 
    updateBlog,
    deleteBlog,
} = require("../controller/blog")
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

/* GET home page. */
router.get('/list', function(req, res, next) {
    let author = req.query.author || ''
    let keyword = req.query.keyword || ''
    
    // 如果是管理员
    if(req.query.isadmin) {

        // 不是管理员不让查看
        if(req.session.username == null) {
            res.json(new ErrorModel('未登录'))
            return;
        }

        // 强制查询自己的博客
        author = req.session.username;
    }

    let result = getList(author, keyword)
    return result.then((listData) => {
        res.json(new SuccessModel(listData)) 
    })
});

router.get('/detail', function(req, res, next) {
    const id = req.query.id
    const result = getDetail(id)
    return result.then((detailData) => {
        res.json(new SuccessModel(detailData));
    })
});

router.post("/new", loginCheck,function(req,res, next) {
    req.body.author = req.session.username;
    let result = newBlog(req.body);
    return result.then((blogId) => {
        res.json(new SuccessModel(blogId));
    })
})

router.post("/update", loginCheck,function(req,res, next) {
    const result = updateBlog(req.query.id, req.body)
    return result.then((flag) => {
        if(flag) {
            res.json(new SuccessModel());
            return ;
        }
        res.json(new ErrorModel("更新博客失败"));
    })
})

router.post("/del", loginCheck, function(req,res, next) {
    let author = req.session.username;
    const result = deleteBlog(req.query.id, author);
    return result.then(flag => {
        if(flag) {
             res.json(new SuccessModel())
        } else {
            res.json(new ErrorModel("删除博客失败"))
        }      
    })
})



module.exports = router;
