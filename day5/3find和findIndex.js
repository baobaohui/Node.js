//ECMAScript6 对数组新增了很多方法 find findIndex
//find - 接收一个方法作为参数，方法内部返回一个条件
//find 会遍历所有的元素，执行给定的代用条件返回值的函数
//如果遍历结束还没有符合该条件的元素，返回undefined

var user = [
	{id:1,name:"张三"},
	{id:2,name:"张三"},
	{id:3,name:"张三"},
	{id:4,name:"张三"}
]

Array.prototype.myFind = function(conditionFunc){
	// var conditionFunc = function(item,index){return item.id===4}
	for(var i=0;i<this.length;i++){
		if(conditionFunc(this[i],i)){
			return this[i]	//这是find 返回 一个对象
			// return i		//findIndex 返回一个数值 索引
		}
	}
}
var ret = user.myFind(function(item,index){
	return item.id===4
})
console.log(ret)