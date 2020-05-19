var express = require('express')
var md5 = require('blueimp-md5')
var User = require('./models/user')
var router = express.Router()

router.get('/',function(req,res){
	// console.log(req.session.user)
	res.render('index.html',{
		user:req.session.user
	})
})

router.get('/login',function(req,res){
	res.render('login.html')
})
router.post('/login',function(req,res){
	//1，获取表单数据
	//2，查询数据库用户名密码是否正确
	//3，发送响应数据
	var body = req.body
	
	User.findOne({
		email:body.email,
		password:md5(md5(body.password))
	},function(err,user){
		if(err){
			return res.status(500).json({
				err_code:500,
				message:err.message
			})
		}
		if(!user){
			return res.status(200).json({
				err_code:1,
				message:'email or password is invalid.'
			})
		}
		//用户存在，登陆成功，通过session记录登陆状态
		req.session.user = user
		res.status(200).json({
			err_code:0,
			message:'ok'
		})
	})
})
router.get('/register',function(req,res){
	res.render('register.html')
})
router.post('/register',function(req,res){
	// 需要安装 body-parser 模块才可以解析post提交的数据
	
	//1，获取表单提交的数据
	//2，操作数据库
		//判断该用户是否存在
		//如果已存在，不允许注册
		//如果不存在，注册新建用户
	//3，发送响应
	var body = req.body
	User.findOne({
		$or:[
			{
				email:body.email
			},
			{
				nickname:body.nickname
			}
		]
	},function(err,data){
		if(err){
			return res.status(500).json({
				err_code:0,
				message:'服务端错误'
			})
		}
		if(data){
			//邮箱或昵称已存在
			return res.status(200).json({
				err_code:1,
				message:'email or nickname already exists.'
			})
		}
		//md5 二次加密
		body.password = md5(md5(body.password))
		new User(body).save(function(err,user){
			if(err){
				return res.status(500).json({
					err_code:500,
					message:'Internal error'
				})
			}
			//注册成功，使用Session记录用户的登陆状态
			req.session.user = user
			
			//express 提供了一个响应方法：json
			//该方法接收一个对象作为参数，它会自动帮你把对象转成json格式数据再发给浏览器
			res.status(200).json({
				err_code:0,
				message:'ok'
			})
			
			//服务端重定向只针对同步请求才有效，异步请求无效
			// res.redirect('/')
		})
		

	})
})
router.get('/logout',function(req,res){
	//清除登陆状态
	req.session.user = null
	
	//重定向到登陆页面
	res.redirect('/login')
	
})
module.exports = router