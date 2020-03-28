//art-template
//art-template 不仅可以在浏览器使用，也可以在node中使用

//art-template 下载方式 npm install art-template --save
// 存放到node_modules

//在Node中使用art-template 模板引擎
//模板最早诞生于服务器领域，后来发展到了前端

//1，安装npm install art-template
//2，在需要使用的文件模块中加载art-template
//	 只需要使用require方法加载就可以了：require('art-template')
//	 参数中的art-template就是你下载的包的名字
//	 也就是说你install的名字是什么，则你require中的就是什么
//3，查文档，使用模板引擎的API
var template = require('art-template')
var fs = require('fs');
// var tplStr = 'hello {{ name }}';
fs.readFile('3tpl.html',function(err,data){
	if(err){
		return console.log('读取文件失败')
	}
	//默认读取到的data是二进制数据，需要转化成字符串格式
	var ret = template.render(data.toString(),{
		name:'baobaohui',
		age:10,
		hobbies:[
			'唱',
			'跳',
			'rap',
			'篮球'
		]
	})
	console.log(ret)
})
//这里不是浏览器
//template('script 标签 id'，{对象})

