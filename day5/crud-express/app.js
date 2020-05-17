/* app.js 入门模块
	创建服务
	做一些服务相关配置
		模板引擎
		body-parser 解析表单 post 请求体
		提供静态资源服务
	挂载路由
	监听端口启动服务
 */
var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')
var app = express()

//开放目录
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

//配置模板引擎
app.engine('html',require('express-art-template'))

//配置模板引擎和body-parser 一定要在app.use(router)挂载路由前面
app.use(bodyParser.urlencoded({extend:false}))
app.use(bodyParser.json())

// router(app)
app.use(router)	//把路由服务挂载到app服务中


app.listen(3000,function(){
	console.log('crud-express running')
})

module.exports = app