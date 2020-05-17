/* 路由模块 
	处理路由
	根据不同请求方法+路径设置具体处理函数

模块职责要单一，划分模块的目的：增强项目代码可维护性，提高开发效率
*/
var fs = require('fs')
var Student = require('./student')
//Express 提供了一种更好的方式，专门用来包装路由
var express = require('express')

//1,创建一个路由容器
var router = express.Router()
//2，把路由都挂载到router路由容器中
router.get('/students',function(req,res){
	//读文件，第二个参数，按照utf8格式进行转换
	// fs.readFile('./db.json','utf8',function(err,data){
	// 	if(err){
	// 		return res.status(500).send("server error")
	// 	}
	// 	// console.log(data)	//字符串类型，转化对象 JSON.parse(data).students
	// 	var students = JSON.parse(data).students
	// 	res.render('index.html',{
	// 		fruits:[
	// 			'苹果',
	// 			'香蕉',
	// 			'橘子'
	// 		],
	// 		students:students
	// 	})
	// })
	
	Student.find(function(err,students){
		if(err){
			return res.status(500).send('server error')
		}
		res.render('index.html',{
			fruits:[
				'苹果',
				'香蕉',
				'橘子'
			],
			students:students
		})
	})
})
router.get('/students/new',function(req,res){
	res.render('new.html')
})
router.post('/students/new',function(req,res){
	/*  1,获取表单数据
		2，处理
			将数据保存到db.json文件中用于持久化
		3，发送响应
		先读取数据，转成对象
		然后网对象中push数据
		然后把对象转为字符串
		然后把字符串再次写入文件
	 */
	new Student(req.body).save(function(err){
		if(err){
			return res.status(500).send('server error')
		}
		res.redirect('/students')
	})
})
//编辑渲染学生页面
router.get('/students/edit',function(req,res){
	//1，在客户端的列表页中处理链接问题(需要有id参数)
	//2，获取要编辑的学生id
	//3，渲染编辑页面
	//		根据id把学生信息查找来，进行模板渲染

	Student.findById(req.query.id.replace(/"/g,''),function(err,student){
		if(err){
			return res.status(500).send('server error')
		}
		res.render('edit.html',{
			student:student
		})
	})
})

//处理编辑学生
router.post('/students/edit',function(req,res){
	//1，获取表单数据
	//	req.body
	//2,更新
	//	Student.update()
	//发送响应
	Student.findByIdUpdate(req.body.id.replace(/"/g,''),req.body,function(err){
		if(err){
			return res.status(500).send('server error')
		}
		res.redirect('/students')
	})
})
//删除学生数据
router.get('/students/delete',function(req,res){
	//1，获取要删除的id
	//2，根据id执行删除操作
	//3，根据操作结果发送响应数据
	Student.findByIdRemove(req.query.id.replace(/"/g,''),function(err){
		if(err){
			return res.status(500).send('server error')
		}
		res.redirect('/students')
	})
})
//导出
module.exports = router

/* module.exports = function(app){
	app.get('/',function(req,res){
		//读文件，第二个参数，按照utf8格式进行转换
		fs.readFile('./db.json','utf8',function(err,data){
			if(err){
				return res.status(500).send("server error")
			}
			console.log(data)	//字符串类型，转化对象 JSON.parse(data).students
			res.render('index.html',{
				fruits:[
					'苹果',
					'香蕉',
					'橘子'
				],
				students:JSON.parse(data).students
			})
		})
	})
	app.get('/students/new',function(req,res){
		
	})
	// app.get('/students/new',function(req,res){
		
	// })
	// app.get('/students/new',function(req,res){
		
	// })
	// app.get('/students/new',function(req,res){
		
	// })
	// app.get('/students/new',function(req,res){
		
	// })
}
 */