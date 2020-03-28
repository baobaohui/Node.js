var http = require('http')

//1,创建server
var server = http.createServer()

//2，监听Server的request请求事件，设置请求处理函数
server.on('request',function(req,res){
	var url = req.url
	if(url === '/')
	{
		res.end('hello world')
	}else{
		res.end('404 not found.')
	}
})

//3,绑定端口号，启动服务
server.listen(3000,function(){
	console.log('http://127.0.0.1:3000/,running')
})