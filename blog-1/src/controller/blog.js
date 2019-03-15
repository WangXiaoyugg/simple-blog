const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    // 先返回假数据，格式是正确的
    let sql = `select * from blog where 1=1 `

    if(author) {
        sql += `and author = "${author}"`
    }

    if(keyword) {
        sql += `and title like "%${keyword}%"`
    }

    return exec(sql)

}

const getDetail = (id) => {
    let sql = `select * from blog where id = ${id}`

    return exec(sql).then(rowData => {
        return rowData[0]
    })
}

const newBlog = (blogData={}) => {
    // blogData 包涵title, content, author
    console.log('blogData', blogData);
    let {title, content, author} = blogData;
    let createTime = Date.now();
    let sql = `insert into blog (title, content, author, createTime)  values ("${title}", "${content}","${author}", ${createTime})`
    return exec(sql).then((insertData) => {
        console.log("insertData", insertData);
        return insertData.insertId
    }).catch(err => {
        console.log(err)
    })
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