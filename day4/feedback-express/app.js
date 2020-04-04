var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use('/public/',express.static('./public/'))

//配置使用art-template模板引擎
//第一个参数，表示当渲染以.art结尾的文件时，使用art-template模板引擎
//express-art-template是专门用来在express中把art-template整合到express中
//虽然外面这里不需要记载art-template但是也必须安装
//原因就在于express-art-template依赖了art-template
app.engine('html',require('express-art-template'))

//express 为 Response响应对象提供了一个方法，render
//render方法默认不可使用，配置模板引擎可以
//res.render('html模板名',{模板数据})
//第一个参数不能写路径，默认会去项目中的views目录查找该模板文件
//也就是说express有一个约定：视图文件放在views目录中

//如果要修改默认的view目录，则可以
//app.set('views',render函数的默认路径)

//配置body-parser 中间件(插件，专门用来解析表单post请求体)
//只要加入这个配置，在req请求对象上会多出来一个属性：body
//也就是说你就可直接通过req.body来获取表单post请求体数据了
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//comments
var comments = [
	{
		name:'张三',
		message:'今天天气不错',
		dateTime:'2020-03-28'
	},
	{
		name:'张三',
		message:'今天天气不错',
		dateTime:'2020-03-28'
	},	{
		name:'张三',
		message:'今天天气不错',
		dateTime:'2020-03-28'
	},	{
		name:'张三',
		message:'今天天气不错',
		dateTime:'2020-03-28'
	},	{
		name:'张三',
		message:'今天天气不错',
		dateTime:'2020-03-28'
	}
]
app.get('/',function(req,res){
	// res.send('/page')
	res.render('index.html',{
		comments:comments
	})
})
/* app.get('/admin',function(req,res){
	res.render('admin/index.html',{
		title:'art-template 模板引擎'
	})
}) */
app.get('/post',function(req,res){
	res.render('post.html')
})
//以post请求 /post 执行指定的处理函数
app.post('/post',function(req,res){
	//1,获取表单数据
	//2，处理
	//3，发送响应
	//req.query只能拿get参数
	var comment = req.body
	comment.dataTime = '2020-04-03'
	comments.unshift(comment)
	//res.send,res.redirect 自动结束会话
	res.redirect('/')	//重定向
})

app.get('/pinglun',function(req,res){
	var comment = req.query
	comment.dataTime = '2020-04-03'
	comments.unshift(comment)
	// res.statusCode = 302
	// res.setHeader('Location','/')
	res.redirect('/')	//重定向
})
app.listen(3000,function(){
	console.log('running...')
})