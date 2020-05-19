## day6 LearningNotes

知识点

### 多人社区案例
	
	安装模块的时候
		npm错误！在分析“…cOATtZd/Q0bDCROwwr\ne”附近时，JSON输入意外结束
		
		npm错误！此运行的完整日志可以在以下位置找到：
		npm错误！D： \app\nodejs\node\u缓存日志\2020-05-18T02\u 45\u 13\u 265Z-debug.log
		
	解决方案：
		npm cache clean --force
	
	expressjs.com	--- express 官方文档

安装的模块
	"art-template": "^4.13.2",		--模板引擎
	"body-parser": "^1.19.0",		--解析提交的post数据
	"bootstrap": "^4.5.0",
	"express": "^4.17.1",			--开发web的快速框架
	"express-art-template": "^1.0.1",
	"jquery": "^3.5.1",
	"mongoose": "^5.9.14"			--操作mongodb数据库的模块

开发过程

	创建目录结构
	整合静态页-模板页
		include
		block
		extend
	设计用户登陆，退出，注册的路由
	用户注册
		先处理好客户端页面的内容(表单控件的name，收集表单数据，发起请求)
		服务端
			获取客户端表单请求数据
			操作数据库
			如果有错，发送500给客户端
			根据业务发送不同的响应数据
	用户登陆
	用户退出

路由设计
	
	路径			方法		get参数		post参数				是否需要登陆		备注
	/			GET														渲染首页
	/register	GET														渲染注册页面
	/register	POST				email,nickname,password				处理注册请求
	/login		GET														渲染登陆页面
	/login		POST				email，password						处理登陆请求
	/logout		GET														处理退出请求
	
	
	
模型设计

功能实现

### 复习
	
	MongoDB数据库
		灵活
		不用设计数据表
		业务的改动不需要关心数据表结构
		
	mongoose
		mongodb官方包也可以操作MongoDB数据库
		第三方包：wordPress 项目开发团队
		设计schema
		发布model 得到模型构造函数
		
	Promise
		callback hell 回调地狱
		回调函数中套了回调函数
		promise 
		容器
			异步任务 pending
			resolve
			reject
		then 方法获取容器的结果 成功的，失败的
		then 方法支持链式调用 
		可以在then 方法中return一个promise对象，然后在then方法中获取上一个then返回的对象
		
### Path 路径操作模块
	
	nodejs.org 		node 官方文档
	
	path.basename()
	path.dirname()	获取一个路径中的目录部分
	path.extname()  获取扩展名 
	path.isAbsolute() 	判断路径是不是绝对路径
	path.format(pathObject)
	path.join()	当你需要进行路径拼接的时候推荐使用这个方法
	path.parse(path)	
		将路径解析成一个对象，包含，
		root，	根路径
		dir，	目录
		base，	包含后缀名的文件
		ext，	ext后缀名
		name	不包含后缀名的文件名
	path.resolve([..paths])

### Node 中的其他非模块成员
	
	在每个模块中，除了require，exports 等模块相关api之外，还有两个特殊的成员
	
	__dirname	可以用来获取当前文件模块所属目录的绝对路径
	__filename	可以用来获取当前文件的绝对路径
	__dirname + __filename 是不受执行node命令所属路径影响的
	
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

### art-template 中的子模板和模板继承
	

子模板	
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<title>document</title>
			<link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
			{{ block 'head' }}
			{{ /block }}
		</head>
		<body>
			{{ include './header.html' }}
			
			<!-- 留坑，留给后面天坑 -->
			{{ block 'content' }}
			<h1>hello {{name}}</h1>
			{{ /block }}
			
			{{ include './footer.html' }}
			
			
			<script src="/node_modules/jquery/dist/jquery.js"></script>
			<script src="/node_modules/bootstrap/dist/js/bootstrap.js"></script>
			{{ block 'script' }}
			{{ /block }}
		</body>
	</html>

模板继承
	
	{{ extend './layout.html' }}
	
	{{ block 'head' }}
		<style>
			body{
				background-color: greenyellow;
			}
			
		</style>
	{{ /block }}
	
	
	{{ block 'content' }}
		<div>
			<h1>index 页面填坑内容</h1>
		</div>
	{{ /block }}
	
	
	{{ block 'script' }}
		<script>
			window.alert('index 页面的填充脚本')
		</script>
	{{ /block }}
	
### 表单同步提交和异步提交
	
	表单具有默认的提交行为，默认是同步的，同步表单提交，浏览器会锁死（转圈儿）等待服务端的响应结果。
	表单的同步提交之后，无论服务端响应的是什么，都会直接把响应的结果覆盖掉当前页面。
	
	后来有人想到了一种办法，来解决这个问题。
### express-session

	在Express这个框架中，默认不支持session cookie
	但是我们可以通过第三方中间件：express-session 来解决
	1,npm install express-session
	2,配置-一定要在app.use(router)之前
	3，使用
		当把这个插件配置好之后，我们就可以通过req.session来访问和设置session成员
		添加session数据	req.session.foo = 'bar'
		访问session数据	req.session.foo
		
	app.use(session({
		secret:'keyboard cat',
		resave:false,
		saveUninitialized:true
	}))
	
	默认session数据是内存存储的，服务器一旦重启，就会丢失，真正的生产环境会把
	session进行持久化存储