var foo = 'bar'

function add(x,y){
	return x+y;
}

//两种暴露方式--是个对象
// exports.add = add;

//只是方法
module.exports = add;

//下面是关于 exports 和 module.exports 之间应用关系阐述的实例
exports.foo = 'bar';	//{foo:bar}

module.exports.a = 123;	//{foo:bar,a:123}

exports ={a:456};	//断开引用关系，最终renturn module.exports

module.exports.foo = 'haha'; //覆盖{foo:haha,a:123}

exports.c = 456;	//不影响，因为已经断开引用关系了

exports = mudule.exports;	//重新建立引用关系

exports.a = 769;//由于已经重新建立关系 {foo:haha,a:769}

//重新建立赋值，最终返回 Function
module.exports = function(){
	console.log('hello')
}