// process.stdin.pipe(process.stdout);

// const http = require("http")
// const server = http.createServer((req, res) => {
//     if(req.method === 'POST') {
//         req.pipe(res);
//     }
// })

// server.listen(8000); 

// const fs = require('fs')
// const path = require('path')
// const file1 = path.join(__dirname, 'data.txt')
// const file2 = path.join(__dirname, 'data.bak.txt')
// const readStream = fs.createReadStream(file1)
// const writeSteam = fs.createWriteStream(file2)
// readStream.pipe(writeSteam)
// readStream.on("data", (chunk) => {
//     console.log(chunk.toString())
// })
// readStream.on("end", () => {
//     console.log("copy txt done!")
// })


const http = require("http")
const fs = require("fs")
const path = require("path")
const file1 = path.join(__dirname, 'data.txt')
const server = http.createServer((req, res) => {
    if(req.method === 'GET') {
        fs.createReadStream(file1).pipe(res);
    }
})

server.listen(8000); 