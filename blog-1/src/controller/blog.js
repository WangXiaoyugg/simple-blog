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
    let {title, content} = blogData;
    let sql = `update blog set title='${title}', content='${content}' where id=${id}`

    return exec(sql).then((result) => {
        if(result.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

const deleteBlog = (id, author) => {
    let sql = `delete from blog where id=${id} and author='${author}'`
    return exec(sql).then((res) => {
        if(res.affectedRows > 0) {
            return true
        }
        return false;
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog,
}