//1,使用require方法加载fs核心模块
var fs = require('fs')

/* 
2,读取文件
	第一个参数是要读取的文件路径
	第二个参数是一个回调函数
		成功
			data 数据
			error null
		失败
			data null
			error 错误对象
 */
fs.readFile('hello.txt',function(error,data){
	console.log(data.toString());
})