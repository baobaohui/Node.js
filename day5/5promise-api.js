//ECMAScript6中中新增了一个api -- Promise
//Promise 是一个构造函数

//创建Promise容器 ， 也就是创建一个承诺，里面放置的是异步任务
var p1 = new Promise(function(resolve,reject){
	fs.readFile('./data/a.txt','utf8',function(err,data){
		if(err){
			//失败了，承诺容器中的任务失败了
			// console.log(err)
			//把容器的Pending 状态变为 Rejected
			
			//调用reject就相当于调用了then方法的第二个参数函数
			reject(err)
		}else{
			//承诺容器中的任务成功了
			// console.log(data)
			//把容器的Pending 状态变为 Resolved
			resolve(data)
		}
	})
})
var p2 = new Promise(function(resolve,reject){
	fs.readFile('./data/b.txt','utf8',function(err,data){
		if(err){
			reject(err)
		}else{
			resolve(data)
		}
	})
})
var p3 = new Promise(function(resolve,reject){
	fs.readFile('./data/c.txt','utf8',function(err,data){
		if(err){
			reject(err)
		}else{
			resolve(data)
		}
	})
})
//p1 就是那个承诺
//当p1成功了，然后(then)做指定的操作,then 方法接收的第一个function就是容器中的resolve函数

//promise 的链式调用，通过return 一个promise对象+then()方法，完成链式调用
p1
	.then(function(data){
		console.log(data)
		/* 
			当p1读取成功的时候
			当前函数中return 的结果就可以在后面的then中function接收到
			当你return 123 后面就接收到123
			最合适的用法是，return 一个promise对象，这样，后续then中的方法的第一个参数会作为
				p2的resolve
		 */
		return p2
	},function(err){
		console.log('读取文件失败了',err)
	})
	.then(function(data){
		console.log(data)
		return p3
	})
	.then(function(data){
		console.log(data)
	})