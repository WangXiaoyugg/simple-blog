/**
 * promise 的基本使用
 */

 const fs = require('fs');
 const path = require('path');

 /**
  * callback 链式获取a.json,b.json, c.json的内容
  **/

// function getFileContent(filename, callback) {
//     const filepath = path.resolve(__dirname, './data', filename);
//     fs.readFile(filepath, (err, data) => {
//         if(err){
//             console.log(err)
//             return
//         }

//         callback(JSON.parse(data.toString()))
//     })
// }  

// getFileContent('a.json', (aData) => {
//     console.log(aData)
//     getFileContent(aData.next, (bData) => {
//         console.log(bData)
//         getFileContent(bData.next, (cData) => {
//             console.log(cData)
//         })
//     })
// })

/**
 * 使用promise 形式封装
 */

function getFileContentPromise(filename) {
    const promise = new Promise((resolve, reject) => {
        const filepath = path.resolve(__dirname, './data', filename)
        fs.readFile(filepath, (err, data) => {
            if(err){
                reject(err);
                return;
            } 
            resolve(JSON.parse(data.toString()))
        })
    })

    return promise;
}


// async function readFileData() {
//     let aData = await getFileContentPromise("a.json");
//     console.log("aData: ", aData);
//     let bData = await getFileContentPromise(aData.next);
//     console.log("bData: ", bData);
//     let cData = await getFileContentPromise(bData.next);
//     console.log("cData: ", cData);
// }
// readFileData()

async function readAData() {
    return await getFileContentPromise('a.json')
}
async function test() {
    let aData = await readAData()
    console.log("aData ", aData);
}
test()

// getFileContentPromise('a.json').then((aData) => {
//     console.log(aData)
//     return getFileContentPromise(aData.next)
// }).then((bData) => {
//     console.log(bData)
//     return getFileContentPromise(bData.next)
// }).then((cData) => {
//     console.log(cData)
// })
