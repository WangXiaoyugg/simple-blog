const notFoundHanlder = (req,res) => {
    res.writeHead('404', {"Content-Type":"text/plain"})
    res.write("404 Not Found!")
    res.end();    
}

module.exports = notFoundHanlder