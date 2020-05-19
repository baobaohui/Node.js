# Node.js LearningNotes
## Day1 Notes

### Node.js 是什么

node.js 是什么
		
	不是一门语言，不是库，不是框架
	是一个javascript运行时环境：node.js可以解析和执行js代码
	
node中的js 是什么
	
	* ECMAScript
	* 没有DOM,BOM
	* 含有服务端相关操作的api
		
		例如文件读写
		网络服务的构建
		网络通信
		http服务器
		...
	* 核心模块
	* 第三方模块
	* 用户自定义模块
		
node.js的特性
	
	事件驱动
	非阻塞IO模型(异步)
	轻量高效

node.js 建立于chrome V8引擎之上	
	
Node.js 能做什么
	
	脱离浏览器执行脚本文件

Node 执行js文件的方式

	node 文件名(比如：hello.js)

核心模块
	
	node为js提供了很多服务器级别的API，这些API绝大多数都被包装到了一个具名的核心
	模块中了，例如文件操作的 fs 核心模块，http服务构建的http模块，path路径操作模块
	os，操作系统信息模块
	
	使用模块的方式
		var fs = require('fs')
		var http = require('http')

用户自定义模块
	
	require
	exports
	
	node中没有全局作用域，只有模块作用域
		外部访问不到内部，内部也访问不到外部
		默认都是封闭的
		通过require 来加载模块，可以省略后缀名
		
	模块与模块之间的通信
		每个文件都提供了一个对象：exports
		esports默认是一个空对象
		
		exports.foo = "hello"
		
		var foo = "hello2"
		exports.foo = foo
		
		exports.add = function(){}

响应内容的类型
	
	声明相应内容的类型
	response.setHeader('Content-Type','text/plain;charset=utf-8')
	
	text/plain
	text/html
	
	格式对应类型查询：tool.oschina.net/commons
	.jpg	image/jpeg
	
	
## day2 Notes

请求对象Request

响应对象Response

在Node中使用模板引擎
	
	art-template 
	npm install art-template --save
	
	
统一处理静态资源
	
	Uniform Resource Locator,统一资源定位符
	
	
服务端渲染
	
	前端渲染	服务端渲染
	
	Ajax 渲染的数据不利于 SEO搜索引擎优化 Search Engine Optimization
	服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
	
	网站真实情况下是异步渲染+服务端渲染出来的
	例如：
		京东的商品列表采用服务端渲染，目的为了SEO
	    商品评论列表为了用户体验，且不需要SEO优化，所以采用客户端渲染
		
	
	
feedback
## day3 Notes

### each 有关的数组
	
	{{each 数组}}
	{{$value}}
	{{/each}}
	
	forEach,低版本不支持 IE8及以下
	$.each(数组，function)
	$('div').each(function)


### 模块系统
	
	核心模块
		文件操作的fs
		http服务的http
		url路径操作模块
		path路径处理模块
		os操作系统信息
		
	第三方模块
		art-template
	
	自己写的模块
		自己创建的文件
		
什么是模块化
	
	文件作用域
	通信规则
		加载 require
			var 自定义变量名称 = require('模块')
			执行被加载的模块中的代码
			得到被加载模块中的exports导出接口对象
			
			
		导出 exports
			node是模块作用域，默认当前文件中的变量只在当前文件中有效，
			对于希望被其他模块访问的成员，需要把这些公开的成员挂载到exports
				接口对象中
			
			导出多个成员(对象)
				exports.a = 123;
				
			导出单个成员(函数，字符串)
				a = 123;
				module.exports = a;


				
CommonJS 模块规范
	
	node中js有一个重要概念：模块系统
		模块作用域
		使用require方法用来加载模块
		使用exports接口对象用来导出模块中的成员
	
	暴露对象的方式
		
		function add(x,y){
			return x+y;
		}
		
		exports.add = add		//导出一个对象，具有add方法
		module.exports = add	//不再导出对象，只导出add方法，

exports 与 module-exports 的区别
	
	在node中，每个模块内部都有一个自己的module对象，该对象中有一个成员：exports
	默认代码的最后由一句：return module.exports
	每次挂载对象的时候只要把内容挂载到 modlue.exports 上就可以，
	同时 exports === module.exports
	也就是说  exports.a  === module.exports.a
	
	但是 当一个模块需要到处单个成员的时候，直接给exports赋值是无效的
	因为 exports只是module.exports 的一个引用，直接赋值的话就等于另创建了一个对象
	所以还是直接赋值给 module.exports = a;

require 加载规则
	
	优先从缓存中加载		
	判断模块标识
		核心模块
		第三方模块
		自己写的模块
	
	模块查找规则
		优先从缓存中加载
		核心模块
		路径形式的文件模块
		第三方模块
			node_modules/art-template/
			node_modules/art-template/package.json
			node_modules/art-template/package.json main
			index.js备选项
			进入上一级目录找 node_modules
			按照这个规则一次往上找，直到磁盘根目录还找不到，报错
	
	
npm
	
	node package manager - npm
	
	npm 常用命令
		npm init
			npm init -y
		npm install
			一次性吧dependencies 选项中的依赖项全部安装
		npm install 包名
			只下载
		npm install 包名 --save
			下载依赖项并保存(package.json文件中的dependencies选项)
			npm i -S 包名
		npm uninstall 包名
			只删除，如果有依赖项会依然保存
			npm un 包名
		npm uninstall --save 包名
			删除的同时也会把依赖信息去除
			npm un -S 包名
		npm help 
			查看使用帮助
		npm 命令 --help
			查看指定命令的使用帮助

	npm 被墙问题
		淘宝npm镜像 http://npm.taobao.org/
		安装淘宝的cnpm:
			npm install --global cnpm
		
		不想安装cnpm又想使用淘宝的服务器来下载：
			npm install jquery --registery=https://registry.npm.taobao.org
		但是每一次手动加参数比较麻烦，可以把这个选项加入配置文件中：
			npm config set registry https://registry.npm.taobao.org
			配置完成后，以后所有的npm install 都会默认通过淘宝的服务器来下载
			
		查看 npm 配置信息
			npm config list
		
package.json
	
	包描述文件：项目依赖的文件及项目相关信息
	npm i art-template --save		在package.json 中的dependencies中记录安装的包
	这样在以后node_module删除后  使用 npm install 即可初始化恢复 

### Express
	
	第三方web开发框架
	高度封装了http模块
	更加专注于业务，而非底层细节

增删改查
	
	使用文件来保存数据（锻炼异步编码）
Mongodb
	所有方法都封装好了
## day4 Notes

### 文件操作路径和模块标识路径问题

	文件操作中的 ./ 可以省略
		fs.readFile('data/a.txt')
		
		在文件操作的相对路径中，
		./data/a.txt 相对于当前目录
			data/a.txt 相对于当前目录
		/data/a.txt  绝对路径，当前文件模块所处的磁盘根目录
		c:/xx/xx... 绝对路径
		
	模块操作中的 . 不可以省略
		require('./data/a.txt')
		
		//模块操作路径
		require('/data/foo.js')	 //忽略 . 是此盘根目录
		require('./data/foo.js')	//相对路径

nodemon	
	
	修改完代码自动重启(保存后自动重启)
		npm install --global nodemon
	版本
		nodemon --version
	使用
		node app.js --> nodemon app.js

静态服务
	
	开放某个目录下的静态资源，供直接访问
	//当以/public/开头的时候，去./public/目录中查找文件
	//当省略第一个参数的时候，可以通过省略/public 的方式来访问文件
	// app.use(express.static('/public/'))
	app.use('/public/',express.static('./public/'))
	
	//必须是/a/public目录中的的资源具体路径,可以看做是 name，后面的是文件的具体位置
	app.use('/a/public',express.static('./public/'))
	app.use('/static/',express.static(path.join(__dirname,'public')))

在espress中配置使用art-template模板引擎

	安装
		npm install --save art-template express-art-template
	配置
		express 默认会去项目中的views目录中找视图文件
		app.engine('html',require('express-art-template'))
		app.get('/admin',function(req,res){
			res.render('admin/index.html',{
				title:'art-template 模板引擎'
			})
		})
		
		修改默认的views视图渲染存储目录：
		app.set('views',目录路径)
在Express中获取get表单数据
	
	使用 内置api  req.query()
在Express中获取post表单数据
	
	express中没有内置获取表单post请求的api，使用第三方包：body-parser
	安装：
		npm install --save body-parser
	配置：
		var express = require('express')
		var bodyParser = require('body-parser')
		var app = express()
		
		//配置body-parser
		//只要加入这个配置，在req请求对象上会多出来一个属性：body
		//也就是说你就可直接通过req.body来获取表单post请求体数据了
		//parse application/x-www-form-urlencoded
		app.use(bodyParser.urlencoded({extended:false}))
		app.use(bodyParser.json())
		
		app.use(function(req,res){
			res.setHeader('Content-Type','text/plain')
			res.write('you posted:\n')
			res.end(JSON.stringify(req.body,null,2))
		})

路由设计
	
|请求方法|	请求路径		|	get参数	|	post参数				|备注	|
|GET	|	/			|			|						|渲染首页|
|GET	|/students/new	|			|						| 		|
|POST	|/students/new	|			|name,age,gender,hobbies|		|	
|GET	|/students/edit	|id			|						|编辑数据|
|POST	|/students/edit	|			|id,name,age,gender,hobbies|编辑数据|
|GET|	|/students/delete|	id		|						|删除数据|

路由模块的提取
	
	将路由部分放在一个模块中，router.js

设计操作文件数据的模块
	
	student.js
	exports.find = function(){
		fs.readFile(dbPath,'utf8',function(err,data){
			if(err){
				return callback(err)
			}
			callback(null,JSON.parse(data).students)
		})
	}
	
封装异步API
	
	//回调函数
	funtion fn(callback){
		//var callback = function(data){console.log(data)}
		
		setTimeout(function(){
			var data = 'hello'
			callback(data)
		},1000)
	}
	
	//如果需要获取一个函数中异步操作的结果，使用回调函数来获取
	fn(function(data){
		console.log(data)
	})
	
### MongoDB
	
	安装
		npm install --save express
		
## day5 Notes

回调函数
	
	js单线程，事件循环机制
	callback
		//回调函数
		//异步操作函数：setTimeout readFile writeFile ajax
		function fn(callback){
			//var callback = function(data){console.log(data)}
			setTimeout(function(){
				var data = 'hello'
				callback(data)
			},1000)
		}
		//如果需要获取一个函数中异步操作的结果，使用回调函数来获取
		fn(function(data){
			console.log(data)
		})
		
	异步
		function add(x,y){
			var ret
			console.log(1)
			setTimeout(function(){
				console.log(2)
				ret = x+y
			},1000)
			console.log(3)
			return ret
		}
		add(10,20);	//1 3 undefined 2

关于JavaScript模块化问题
	
	Node 中的 CommonJS
	浏览器中的
		AMD require.js
		CMD sea.js
	
	在 ES6 前， 实现模块化使用的是 RequireJS 或者 seaJS
	（分别是基于 AMD 规范的模块化库，  和基于 CMD 规范的模块化库）

package.json 和 package.lock.json
	
	npm5以后有的package.lock.json
		自动保存依赖信息
		记录node_modules 中的所有包的信息(版本，下载地址)，这样提升npm i 时依赖项加载速度
		lock-锁
			锁定依赖项的版本，在npm i 时继续使用之前的版本

find 和 findIndex 原理
	
	var user = [
		{id:1,name:"张三"},
		{id:2,name:"张三"},
		{id:3,name:"张三"},
		{id:4,name:"张三"}
	]
	
	Array.prototype.myFind = function(conditionFunc){
		// var conditionFunc = function(item,index){return item.id===4}
		for(var i=0;i<this.length;i++){
			if(conditionFunc(this[i],i)){
				return this[i]	//这是find 返回 一个对象
				// return i		//findIndex 返回一个数值 索引
			}
		}
	}
	var ret = user.myFind(function(item,index){
		return item.id===4
	})
	console.log(ret)
	
	Array.prototype
		every some includes map ...
### MongoDB
	
	关系型数据库：
		表就是关系，表与表之间存在关系
		所有关系型数据库都需要通过sql语言操作
		所有关系型数据库在操作之间都需要设计表的结构
		数据库支持约束
			唯一的
			主键
			默认值
			非空
			
	MongoDB 是长得最像关系型数据库的非关系型数据库
		数据库	--  数据库
		数据表	--  集合(数组)
		表记录	--  文档对象
		
		mongoDB不需要设计表结构
		json存储数据
	{
		qq:{
			users:[
				{name:'张三',age:15},
				.....
			],
			products:[
				
			],
		},
		taobao:{
		
		},
	}
启动和关闭数据库
	
	1，注册成为windows服务进行管理
	2，第二种方式
		启动：
			//mongodb 默认使用执行mongod命令所处的盘符根目录下的/data/db作为自己的数据存储目录
			//所以在第一次执行该命令之前先手动新建一个/data/db
			mongod
		关闭：
			ctrl+c
			
		修改默认的数据存储目录
			mongod --dbpath=数据存储目录路径D:\app\MongoDB\mongodb_data
连接数据库
	
	连接
		//该命令默认连接诶本机mongodb数据库
		mongo
	退出
		exit
	
基本命令
	
	show dbs
		展示数据库
	show collections
		展示集合
	use 数据库名称
		切换到指定数据库
	db 
		查看当前操作的数据库
	插入数据
		db.students.insertOne({"name":"jack"})
	查看集合中数据
		db.students.find()

Node中操作MongoDB数据
	
	1，使用官方的mongodb包来操作(github上有)
	2，使用第三方mongoose来操作MongoDB数据库
		第三方包：mongoose 基于MongoDB官方的mongodb包再一次做了封装
		npm i mongoose
	3，连接数据库，进行操作
		var mongoose = require('mongoose');
		//连接数据库
		mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true});
		mongoose.Promise = global.Promise;
		
		//创建一个模型
		//就是在设计数据库
		//MongoDB是动态的，非常灵活，只需要在代码中设计数据库就可以了
		var Cat = mongoose.model('Cat',{name:String});
		
		//循环插入
		for(var i=0;i<100;i++)
		{
			//实例化一个 Cat
			var kitty = new Cat({name:'喵喵'+i});
			
			//持计划保存kitty实例
			kitty.save(function(err){
				if(err){
					console.log(err);
				}else{
					console.log('meow');
				}
			});
		}
新增数据
	
	User.save()
	
查询数据

	User.find(function(err,ret){
		if(err){
			console.log(err)
		}else{
			console.log(ret);
		}
	})
	
	User.find({username:'zs'},function(err,ret){
		if(err){
			console.log('查询失败');
		}else{
			console.log(ret)
		}
	})
	
	//无条件的话，默认查找第一条数据
	User.findOne({
		username:'zs',
		password:123456,
	},function(err,ret){
		if(err){
			console.log('查询失败');
		}else{
			console.log(ret)
		}
	})
更新数据
	
	User.findByIdAndUpdate('5a001b23d219eb00c8581184',{
		password:'123'
	},function(err,ret){
		if(err){
			console.log('更新失败')
		}else{
			console.log('更新成功')
		}
	})
	Model.update(options,doc,[options],[callback])
	User.findOneAndUpdate()
删除数据
	
	User.remove({
		username:'zs'
	},function(err,ret){
		if(err){
			cosole.log('删除失败')
		}
		}else{
			console.log('删除成功');
			console.log(ret)
		})
		
### 使用Node 操作Mysql数据库
	
	安装
		npm install mysql
	使用
		//导入模块
		var mysql = require('mysql');
		
		//创建连接
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'me',
		  password : 'secret',
		  database : 'my_db'
		});
		 
		//连接
		connection.connect();
		 
		//操作数据库
		connection.query('select * from user', function (error, results, fields) {
		  if (error) throw error;
		  console.log('The solution is: ', results[0].solution);
		});
		 
		//关闭数据库
		connection.end();
### Promise

回调地狱 --- 异步中 逐层嵌套

		fs.readFile('./a.txt',function(err,data){
			console.log(data)
			fs.readFile('./b.txt',function(err,data){
				console.log(data)
				fs.readFile('./c.txt',function(err,data){
					console.log(data)
				})
			})
		})
		
解决方法：ECMAScript6中中新增了一个api -- Promise

		三种状态：
			Pending			未发生的
			Resolved		成功
			Rejected		失败
			
		promise 本身不是异步，但里面往往封装一个异步任务
		
promise链式调用

		var p2 = new Promise(function(resolve,reject){
			fs.readFile('./data/b.txt','utf8',function(err,data){
				if(err){
					reject(err)
				}else{
					resolve(data)
				}
			})
		})
		//promise 的链式调用，通过return 一个promise对象+then()方法，完成链式调用
		p1
			.then(function(data){
				console.log(data)
				/* 
					当p1读取成功的时候
					当前函数中return 的结果就可以在后面的then中function接收到
					当你return 123 后面就接收到123
					最合适的用法是，return 一个promise对象，这样，后续then中的方法的第一个参数会作为
						p2的resolve
				 */
				return p2
			},function(err){
				console.log('读取文件失败了',err)
			})
			.then(function(data){
				console.log(data)
				return p3
			})
			.then(function(data){
				console.log(data)
			})
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