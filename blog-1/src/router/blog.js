const { getList, 
        getDetail, 
        newBlog, 
        updateBlog,
        deleteBlog,
    } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require('../model/resModel')

const loginCheck = (req) => {
    if(!req.session.username) {
        return Promise.resolve(new ErrorModel("尚未登录"))
    } 
}
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
        let checkResult = loginCheck(req);
        if(checkResult) {
            return checkResult
        }
        req.body.author = req.session.username;
        let result = newBlog(req.body);
        return result.then((blogId) => {
            return new SuccessModel(blogId);
        })
      
    }

    if(method === 'POST' && req.path === '/api/blog/update') {
        let checkResult = loginCheck(req);
        if(checkResult) {
            return checkResult
        }
        const result = updateBlog(id, req.body)
        return result.then((res) => {
            if(res) {
                return new SuccessModel();
            }
            return new ErrorModel("更新博客失败");
        })
        
    }

    if(method === 'POST' && req.path === '/api/blog/delete') {
        let checkResult = loginCheck(req);
        if(checkResult) {
            return checkResult
        }
        let author = req.session.username;
        const result = deleteBlog(id, author);
        return result.then(res => {
            if(res) {
                return new SuccessModel()
            } else {
                return new ErrorModel("删除博客失败")
            }      
        })
        
    }
}

module.exports = handleBlogRouter