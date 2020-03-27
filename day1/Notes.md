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

Content-Type响应内容的类型
	
	声明相应内容的类型
	response.setHeader('Content-Type','text/plain;charset=utf-8')
	
	text/plain
	text/html
	
	格式对应类型查询：tool.oschina.net/commons
	.jpg	image/jpeg
	
	
	