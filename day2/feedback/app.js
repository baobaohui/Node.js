// application 应用程序

var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

var comments = [
	{
		name:'张三',
		message:'今天天气不错',
		dateTime:'2020-03-28'
	},
	{
		name:'张三',
		message:'今天天气不错',
		dateTime:'2020-03-28'
	},	{
		name:'张三',
		message:'今天天气不错',
		dateTime:'2020-03-28'
	},	{
		name:'张三',
		message:'今天天气不错',
		dateTime:'2020-03-28'
	},	{
		name:'张三',
		message:'今天天气不错',
		dateTime:'2020-03-28'
	}
]

http 
	.createServer(function(req,res){
	//使用url.parse方法将路径解析为一个方便操作的对象，
	//第二个参数为true表示直接查询字符串转为一个对象(通过query属性来访问)
		var parseObj = url.parse(req.url,true)
	// 单独获取不包含查询字符串的路径部分（该路径不包含？之后的内容）
		var pathname = parseObj.pathname
		if(pathname === '/'){
			fs.readFile('./views/index.html',function(err,data){
				if(err){
					return res.end('404 not found')
				}
				var htmlStr = template.render(data.toString(),{
					comments:comments
				})
				res.end(htmlStr)
			})
		}
		else if(pathname === '/post'){

			fs.readFile('./views/post.html',function(err,data){
				if(err){
					return res.end('404 not found')
				}
				res.end(data)
			})
		}else if(pathname.indexOf('/public') === 0){
			//统一处理：
			// 	如果请求路径是以/public/开头的，则我认为你要获取public
			// 中某个资源，所以我们就直接可以把请求路径当作文件路径来直接进行读取
			fs.readFile('.'+pathname,function(err,data){
				if(err){
					return res.end('404 not found')
				}
				res.end(data)
			})
		}else if(pathname === '/pinglun'){
			// console.log('收到表单请求了',parseObj.query)
			//一次请求对应一次响应
			// res.end(JSON.stringify(parseObj.query))
			//接下来要做的事情：
			//1，获取表单提交的数据 parseObj.query
			//2，生成日期到数据对象中，然后存储到数组中
			//3，让用户在重定向跳转到首页 /
			//		当用户重新请求时，数据发生变换
			var comment = parseObj.query
			comments.dateTime = '2020-03-28'
			comments.push(comment)
			//如何进行重定向
			//	1，状态码设置为302 临时重定向
			//		statusCode
			//	2，在响应头中通过Location告诉客户端往哪里重定向
			//		setHeader
			//	如果客户端发现收到服务器的响应状态码是302就会自动去响应头中
			//	找Location，然后对改地址发起新的请求，所以客户端就会自动跳转了
			res.statusCode = 302
			res.setHeader('Location','/')
			res.end()
		}
		else{
			//其他的都处理成404 找不到页面
			fs.readFile('./views/404.html',function(err,data){
				if(err){
					return res.end('404not found')
				}
				res.end(data)
			})
		}
		
	})
	.listen(3000,function(){
		console.log('running...')
	})