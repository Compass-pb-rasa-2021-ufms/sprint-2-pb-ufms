const http = require('http')
const fs = require('fs')

const port = process.env.PORT || 3000

fs.readFile('./index.html', function(error,data) {
    if(error)
        throw error
    htmlFile = data
})
fs.readFile('./style.css', function(error,data) {
    if(error)
        throw error
    cssFile = data
})
fs.readFile('./script.js', function(error,data) {
    if(error)
        throw error
    jsFile = data
})

var server = http.createServer(function (req,res){
    switch(req.url){
        case '/style.css' :
            res.writeHead(200, {'Content-Type':'text/css'})
            res.write(cssFile)
            break;
        case '/script.js':
            res.writeHead(200,{'Content-Type':'text/javascript'})
            res.write(jsFile)
            break
        default :
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(htmlFile)
    }
    res.end();
})        

server.listen(port,function(error) {
    if(error)
        console.log(error)
    else
        console.log('Funcionando | Localhost: 3000')
})