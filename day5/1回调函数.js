//回调函数--异步--js事件循环机制
function add(x,y){
	console.log(1)
	setTimeout(function(){
		console.log(2)
		return x+y
	},0)
	console.log(3)
}
add(10,20);	//1 3 2

//回调函数
//异步操作函数：setTimeout readFile writeFile ajax
function fn(callback){
	//var callback = function(data){console.log(data)}
	setTimeout(function(){
		var data = 'hello'
		callback(data)
	},1000)
}
//如果需要获取一个函数中异步操作的结果，使用回调函数来获取
fn(function(data){
	console.log(data)
})

//闭包函数
function b(){
	var a =1;
	function c(){
		console.log(a);
	}
	c();
}
b();