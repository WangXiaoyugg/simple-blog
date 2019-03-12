const serverHandle = (req, res) => {
    // 设置返回JSON格式
    res.setHeader("Content-Type", "application/json")

    let resData = {
        name: "Garen",
        age: 25,
        env: process.env.NODE_ENV
    }

    res.end(JSON.stringify(resData));
}

module.exports = serverHandle;