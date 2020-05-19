var http = require('http')

var server = http.createServer(function(req,res){
	//解析表单get请求体
	//解析表单post请求体
	//解析表单cookie
	//处理session
	//使用模板引擎
	
	//解析请求地址中的get参数
	var urlObj = url.parse(req.url,true)
	req.query = urlObj.query
	
	//解析请求地址中的post参数
	req.body = {
		
	}
})

server.listen(3000,function(){
	console.log('running...')
})