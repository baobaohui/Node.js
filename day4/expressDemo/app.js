var express = require('express')

//1,创建app
var app = express()

app.get('/',function(req,res){
	// res.write("hello")
	// res.end()
	res.send('hello world')
})
app.get('/login',function(req,res){
	res.send("login")
})

//当以/public/开头的时候，去./public/目录中查找文件
//当省略第一个参数的时候，可以通过省略/public 的方式来访问文件
// app.use(express.static('/public/'))
app.use('/public/',express.static('./public/'))

//必须是/a/public目录中的的资源具体路径,可以看做是 name，后面的是文件的具体位置
// app.use('/a/public',express.static('./public/'))

// app.use('/static/',express.static(path.join(__dirname,'public')))

app.listen(3000,function(){
	console.log("express app is running")
})