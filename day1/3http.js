//使用node 构建一个web服务器

//1，加载http核心模块
var http = require('http')

//2，使用http.createServer()方法创建一个web服务器，返回一个Server实例
var server = http.createServer()

//3，服务器：提供对数据的服务，响应请求
server.on('request',function(request,response){
	//request 是请求的对象，里包含请求的一些属性
	console.log('收到客户端的请求了，请求路径是：'+request.url)
	console.log('请求的客户端的端口号：',request.socket.remoteAddress,request.socket.remotePort)
	// response.write('begin response')
	
	if(request.url == '/login'){
		response.write('登录路由')
	}else if(request.url == '/register'){
		response.write('注册路由')
	}
	else if(request.url === '/plain'){
		//node使用的是utf8 而中文浏览器默认编码 gbk
		//告诉浏览器返回的内容类型
		response.setHeader('Content-Type','text/plain;charset=utf-8')
		response.end("hello 世界")
	}
	else if(request.url === '/html'){
		response.setHeader('Content-Type','text/html;charset=utf-8')
		response.end('<p>hello html</p>')
	}
	else if(request.url === '/htmltext')
	{
		response.end('./3http.html')
	}
	else{
		response.write('普通路由')
	}
	
	//response 相应内容只能是二进制数据或字符串
	var products =[
		{
			name:'苹果',
			price:12
		},
		{
			name:'苹果2',
			price:123
		},
		{
			name:'苹果3',
			price:1234
		}
	]
	
	
	// res.end(JSON.stringify(products))
	
	response.end()
	
	// 也可以不使用 response.write()，直接使用 response.end("hello node.js")

})

//4，绑定端口号，启动服务器
server.listen(3000,function(){
	console.log('服务器成功启动，通过http://127.0.0.1:3000/进行访问')
})