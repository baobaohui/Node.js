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