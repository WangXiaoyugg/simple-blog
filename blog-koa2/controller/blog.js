const { exec } = require('../db/mysql')
const xss = require('xss')
const getList = async (author, keyword) => {
    let sql = `select * from blog where 1=1 `

    if(author) {
        sql += `and author = "${author}"`
    }

    if(keyword) {
        sql += `and title like "%${keyword}%"`
    }

    return await exec(sql)

}

const getDetail = async (id) => {
    let sql = `select * from blog where id = ${id}`
    const rowData = await exec(sql)
    return rowData[0];
    
}

const newBlog = async (blogData={}) => {
    // blogData 包涵title, content, author
    let {title, content, author} = blogData;
    title = xss(title)
    content = xss(content)
    let createTime = Date.now();
    let sql = `insert into blog (title, content, author, createTime)  values ("${title}", "${content}","${author}", ${createTime})`
    let insertData = await exec(sql);
    return insertData.insertId;
   
}

const updateBlog = async(id, blogData={}) => {
    let {title, content} = blogData;
    title = xss(title)
    content = xss(content)
    let sql = `update blog set title='${title}', content='${content}' where id=${id}`
    let result = await exec(sql);
    if(result.affectedRows > 0) {
        return true;
    }
    return false;
    
}

const deleteBlog = async (id, author) => {
    let sql = `delete from blog where id=${id} and author='${author}'`
    let result = await exec(sql);
    if(result.affectedRows > 0) {
        return true
    }
    return false;
    
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog,
}