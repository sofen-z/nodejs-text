var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个小BABY发请求过来！路径（带查询参数）为：' + pathWithQuery)

  if(path === '/'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
      <!DOCTYPE html>
      <head>
        <link rel="stylesheet" href="/x">
      </head>
      <body>
        <h1>你原地旋转10圈了吗？</h1>
        <script src='/y'></script>
      </body>
    `)
    response.end()
   } else if(path === '/x'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`
    h1{
      width: 500px;
      color: red;
      border: 1px solid red;
      background: yellow;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
    }
    `)
     response.end()
  } else if(path === '/y'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(`console.log('这是js内容')`)
    response.end()
  }else {
   response.statusCode = 404
     response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`猛男提醒：你访问的页面不存在。`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('猛男监听 ' + port + ' 成功\n是猛男就原地旋转10圈再打开这个页面 http://localhost:' + port)

