var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')
var bodyParser = require('body-parser')
var session = require('express-session')
var path = require('path')
var router = require('./router')

var app = express()

app.use('/public/',express.static('./public'))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views/'))	//默认就是 ./views 目录


//配置body-parser	配置之后，req请求对象上会多出一个属性 body，
//可以通过req.body来获取表单post请求数据
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
//parse application/json
app.use(bodyParser.json())

//在Express这个框架中，默认不支持session cookie 
//但是我们可以通过第三方中间件：express-session 来解决
//1,npm install express-session
//2,配置-一定要在app.use(router)之前
//3，使用
//当把这个插件配置好之后，我们就可以通过req.session来访问和设置session成员
//添加session数据	req.session.foo = 'bar'
//访问session数据	req.session.foo
app.use(session({
	secret:'keyboard cat',	//配置加密字符串，它会在原有加密基础上和这个字符串拼起来去加密
	resave:false,	
	saveUninitialized:false	//true -- 无论是否使用session，都默认分配一把钥匙
}))


//把路由挂载到app中
app.use(router)

app.listen(3000,function(){
	console.log('running...')
})