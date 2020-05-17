var mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true});
mongoose.Promise = global.Promise;

//创建一个模型
//就是在设计数据库
//MongoDB是动态的，非常灵活，只需要在代码中设计数据库就可以了
var Cat = mongoose.model('Cat',{name:String});

//循环插入
for(var i=0;i<100;i++)
{
	//实例化一个 Cat
	var kitty = new Cat({name:'喵喵'+i});
	
	//持计划保存kitty实例
	kitty.save(function(err){
		if(err){
			console.log(err);
		}else{
			console.log('meow');
		}
	});
}

