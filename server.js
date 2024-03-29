
//调用模块
var http = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')

console.log('visit http://localhost:8090' )


//创建服务器
var server = http.createServer(function(req,res) {
    routePath(req,res)
})

//服务器接收到请求后的处理
function routePath(req,res) {
    var pathObj = url.parse(req.url,true)
    var handleFn = routes[pathObj.pathname]
    if(handleFn) {
        req.query = pathObj.query   //处理GET请求

        //处理POST请求
        var body = ''
        req.on('data',function(chunk){
            body += chunk
        }).on('end',function(){
            req.body = parseBody(body)
            handleFn(req,res)
        })
    }else{
        staticRoot(path.resolve(__dirname,"static"),req,res)
    }
}

//处理POST请求
function parseBody(body) {
    var obj = {}
    body.split('&').forEach(function(ele){
        obj[ele.split('=')[0]] = ele.split('=')[1]
    })
    return obj
}


//不同路由的不同处理情况
var routes = {
    '/login': function(req,res) {
        var username = req.body.username
        res.end('登陆账户' + username)
    },
    '/search': function(req,res) {
        var team = req.query.team
        switch(team){
            case '马刺':
                res.end('15胜-5负')
                break;
            case '火箭':
                res.end('17胜-3负')
                break;
            case '湖人':
                res.end('10胜-10负')
                break;
            default:
                res.end('Not Found') 
        }
    }
}


//静态目录情况
function staticRoot(staticPath,req,res) {
    var pathObj = url.parse(req.url,true)
    var filePath = path.join(staticPath,pathObj.pathname)
    //console.log(pathObj)
    //console.log(staticPath)
    //console.log(filePath)
    fs.readFile(filePath,function(err,content){
        if(err) {
            res.writeHead('404','Page Not Found')
            return res.end()
        }

        res.writeHead(200,'ok')
        res.write(content)
        res.end()
    })
}


//监听端口
server.listen(8090)