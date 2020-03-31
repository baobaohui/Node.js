// 0,安装
// 1,引包

var express = require('express')
//2,创建你服务器应用程序
//就是原来的http.createServer
var app = express()

//公开指定目录
//这样做可以直接通过/public/xx 的方式访问 public 目录中所有的资源
app.use('/public/',express.static('./public/'))

//模板引擎，在express中也是一个api的事儿


//得到路径，逐个判断不需要if lese
app.get('/about',function(req,res){
	res.send('你好，我是express')
})
//当服务器收到get请求 / 的时候，执行回调处理函数
app.get('/',function(req,res){
	res.send('hello express!')
})



//相当于server.listen
app.listen(3000,function(){
	console.log('app is running at port 3000')
})

