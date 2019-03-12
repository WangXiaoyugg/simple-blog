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

module.exports = {
    getList,
}