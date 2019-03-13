const getList = (author, keyword) => {
    // 先返回假数据，格式是正确的
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: new Date().getTime(),
            author: '章三'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: new Date().getTime() + 1000,
            author: '李四'
        },
    ]
}

const getDetail = (id) => {
    // 准备返回的假数据
    return  {
        id: 1,
        title: '标题A',
        content: "内容A",
        createTime: new Date().getTime(),
        author: '张三'
    }
}

const newBlog = (blogData={}) => {
    // blogData 包涵title, content, author
    console.log("newBlog data", blogData)
    return {
        id: 3,

    }
}

const updateBlog = (id, blogData={}) => {
    console.log('id, blogData', id, blogData)
    return true
}

const deleteBlog = (id) => {
    console.log("id", id)
    return true;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog,
}