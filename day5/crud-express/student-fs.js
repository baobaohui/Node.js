/* 
 student.js
	数据操作文件模块
	操作文件中的数据，只处理数据，不关心业务

	Node 精华：封装异步API
 */
var fs = require('fs')
var dbPath = './db.json'

/* 获取所有学生列表 
	callback 中的参数
	第一个参数时 err
		成功是 null
		错误是 错误对象
	第二个参数时结果
		成功是数组
		错误是undefined
return []
*/
exports.find = function(callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		callback(null,JSON.parse(data).students)
	})
}
// find(function(err,data){
	
// })


/* 
	根据id获取学生信息对象
	@param {Number} id	学生id
	@param {Function} callback 回调函数
 */
exports.findById = function(id,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		
		var ret = students.find(function(item){
			return item.id === id
		})
		callback(null,ret)
	})
}
/* 添加保存学生 */
exports.save = function(student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		//处理id 保证不重复
		student.id = students[students.length-1].id+1
		//把用户传递的对象保存到数组中
		students.push(student)
		//把对象数据转换为字符串
		var fileData = JSON.stringify({
			students:students
		})
		//把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if(err){
				//错误就是吧错误对象传递给他
				return callback(err)
			}
			//成功就没错，所以错误对象是null
			callback(null)
		})
	})
}

/* 更新学生 */
exports.updateById = function(student,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		//存放数组id
		student.id = parseInt(student.id)
		//使用ES6中的数组方发 find
		//接收一个函数作为参数，当某个遍历项符合item.id===student.id条件
		//时，find会终止遍历同时返回遍历项
		var stu = students.find(function(item){
			return item.id === student.id
		})
		//遍历拷贝对象
		for(var key in student){
			stu[key] = student[key]
		}
		
		//把对象数据转换为字符串
		var fileData = JSON.stringify({
			students:students
		})
		//把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if(err){
				//错误就是吧错误对象传递给他
				return callback(err)
			}
			//成功就没错，所以错误对象是null
			callback(null)
		})
	})
}
/* 删除学生 */
exports.deleteById = function(id,callback){
	fs.readFile(dbPath,'utf8',function(err,data){
		if(err){
			return callback(err)
		}
		var students = JSON.parse(data).students
		//findIndex 根据条件查找元素的小标
		var deleteId = students.findIndex(function(item){
			return item.id === parseInt(id)
		})
		//删除数据
		students.splice(deleteId,1)
		//把对象数据转换为字符串
		var fileData = JSON.stringify({
			students:students
		})
		//把字符串保存到文件中
		fs.writeFile(dbPath,fileData,function(err){
			if(err){
				//错误就是吧错误对象传递给他
				return callback(err)
			}
			//成功就没错，所以错误对象是null
			callback(null)
		})
	})
}