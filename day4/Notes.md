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
		
	