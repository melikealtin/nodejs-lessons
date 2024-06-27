const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    if(req.url === "/") {
        res.write("<h1>hello ! this is index</h1>")
        res.end()
    }
    if(req.url === "/about") {
        res.write("<h1>hello ! this is about</h1>")
        res.end()
    }
    // process.exit()
})

server.listen(3000)



