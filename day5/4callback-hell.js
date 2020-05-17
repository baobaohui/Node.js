var fs = readfile('fs')

fs.readFile('./data/a.txt',function(err,data){
	if(err){
		//return console.log('读取失败')
		// 抛出异常
		// 1,阻止程序的执行
		// 2，把错误消息打印到控制太
		throw err
	}
	console.log(data)
	fs.readFile('./data/b.txt',function(err,data){
		if(err){
			throw err
		}
		console.log(data)
		fs.readFile('./data/c.txt',function(err,data){
			if(err){
				throw err
			}
			console.log(data)
		})
	})
})