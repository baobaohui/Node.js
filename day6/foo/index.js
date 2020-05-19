	// 模块中的路径标识和文件操作中的相对路径标识不一致
	// 模块中的路径标识就是相当于当前文件模块，不受node命令所处路径影响
var fs  = require('fs')

//	./a.txt 相当于当前文件路径
//	./a.txt 相对与执行node命令所处的终端路径
//	文件操作路径中，相对路径设计的就是相对于执行node命令所处的路径
// fs.readFile('D:/app/nodeProject/nodeLearning/day6/2文件路径的问题.js','utf8',function(err,data){
// 	if(err){
// 		throw err
// 	}
// 	console.log(data)
// })

fs.readFile(__dirname+'/a.txt,'utf8',function(err,data){
	if(err){
		throw err
	}
	console.log(data)
})
