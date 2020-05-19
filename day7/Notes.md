## day7 LearningNotes

### 文件操作相对路径问题
	
	文件操作使用动态绝对路径
		__dirname
		__filename
		
	在文件操作中，使用相对路径是不可靠的，在node中文件操作的路径被设计为相当于
	执行node命令所处的路径。
	
	解决方式：把相对路径变为绝对路径
		__dirname
		__filename
		
		fs.readFile(__dirname+'/a.txt,'utf8',function(err,data){
			if(err){
				throw err
			}
			console.log(data)
		})
		
	模块中的路径标识和文件操作中的相对路径标识不一致
	模块中的路径标识就是相当于当前文件模块，不受node命令所处路径影响
### cookie 插件
	
	https://github.com/js-cookie/js-cookie
	EditThisCookie Chrome 浏览器
	
### 中间件
	
	request
	response
	next()
	
	同一个请求所经过的中间件都是同一个请求对象和响应对象
	
应用程序级别中间件

	万能匹配（不关心任何请求路径和请求方法）
	app.use(function(req,res,next){
		console.log("time",Date.now())
		next()
	})
路由级别中间件

	get
		app.get('/',function(req,res){
			res.send("hello world")
		})
	post
	put
	delete
错误处理中间件

	app.use(function(err,req,res,next){
		console.log(err.stack)
		res.status(500).send("something broke")
	})
内置中间件
	
	express.static
	express.json
第三方中间件
	
	http://expressjs.com/en/resources/middleware.html
	
	body-parser
	compression
	cookie-parser
	morgan
	response-time
	serve-static
	session