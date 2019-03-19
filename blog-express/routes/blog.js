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

/* GET home page. */
router.get('/list', function(req, res, next) {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    let result = getList(author, keyword)
    return result.then((listData) => {
        res.json(new SuccessModel(listData)) 
    })
});

router.get('/detail', function(req, res, next) {
    const id = req.query.id
    const result = getDetail(id)
    return result.then((detailData) => {
        console.log('detailData: ', detailData)
        res.json(new SuccessModel(detailData));
    })
});

module.exports = router;
