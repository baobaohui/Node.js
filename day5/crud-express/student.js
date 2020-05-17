//导入mongoose 模块
var mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/itcast',{useMongoClient:true})

//使用mongoose的Schema来创建集合，也就是mysql中的表
var Schema = mongoose.Schema

var commentSchema = new Schema({
	name:{
		type:String,
		required:true
	},
	gender:{
		type:Number,
		enum:[0,1],
		default:0
	},
	age:{
		type:Number,
	},
	hobbies:{
		type:String
	}
})

//直接导出模型构造函数--创建集合
module.exports = mongoose.model('Comment',commentSchema)