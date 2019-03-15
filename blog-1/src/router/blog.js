const { getList, 
        getDetail, 
        newBlog, 
        updateBlog,
        deleteBlog,
    } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleBlogRouter = (req, res) => {
    const method = req.method
    const id = req.query.id
    
    if(method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        let result = getList(author, keyword)
        return result.then((listData) => {
            return new SuccessModel(listData)
        })
    }

    if(method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then((detailData) => {
            return new SuccessModel(detailData);
        })
    }

    if(method === 'POST' && req.path === '/api/blog/new') {
        req.body.author = 'garen'
        const blogData = req.body
        let result = newBlog(blogData);
        return result.then((blogId) => {
            return new SuccessModel(blogId);
        })
      
    }

    if(method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if(result) {
            return new SuccessModel();
        } else {
            return new ErrorModel("更新博客失败");
        }
        
    }

    if(method === 'POST' && req.path === '/api/blog/delete') {
        const result = deleteBlog(id);
        if(result) {
            return new SuccessModel()
        } else {
            return new ErrorModel("删除博客失败")
        }
    }
}

module.exports = handleBlogRouter