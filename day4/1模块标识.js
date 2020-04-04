var fs = require('fs')
// 在文件操作的相对路径中，
// ./data/a.txt 相对于当前目录
// 	data/a.txt 相对于当前目录
// /data/a.txt  绝对路径，当前文件模块所处的磁盘根目录
// c:/xx/xx... 绝对路径
fs.readFile('./data/a.txt',function(err,data){
	if(err){
		console.log(err)
		return consoe.log("读取失败")
	}
	console.log(data.toString())
})

//模块操作路径
require('/data/foo.js')	 //忽略 . 是此盘根目录
require('./data/foo.js')	//相对路径