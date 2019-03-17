const fs = require('fs')
const path = require('path')
const readline = require("readline")

const filename = path.join(__dirname, '../../logs/access.log')
const readStream = fs.createReadStream(filename)

const rl = readline.createInterface({
    input: readStream
})

let total = 0;
let chromeNumber = 0;

rl.on("line", (data) => {
    if(!data) return;
    total++;

    let arr = data.split("--")
    if(arr[2] && arr[2].indexOf("Chrome") > -1){
        chromeNumber++;
    }
})

rl.on('close', () => {
    console.log("chrome 占比是:" + Math.round(chromeNumber / total * 100) + "%");
})