## day3 Notes

### each 有关的数组
	
	{{each 数组}}
	{{$value}}
	{{/each}}
	
	forEach,低版本不支持 IE8及以下
	$.each(数组，function)
	$('div').each(function)


### 模块系统
	
	核心模块
		文件操作的fs
		http服务的http
		url路径操作模块
		path路径处理模块
		os操作系统信息
		
	第三方模块
		art-template
	
	自己写的模块
		自己创建的文件
		
什么是模块化
	
	文件作用域
	通信规则
		加载 require
			var 自定义变量名称 = require('模块')
			执行被加载的模块中的代码
			得到被加载模块中的exports导出接口对象
			
			
		导出 exports
			node是模块作用域，默认当前文件中的变量只在当前文件中有效，
			对于希望被其他模块访问的成员，需要把这些公开的成员挂载到exports
				接口对象中
			
			导出多个成员(对象)
				exports.a = 123;
				
			导出单个成员(函数，字符串)
				a = 123;
				module.exports = a;


				
CommonJS 模块规范
	
	node中js有一个重要概念：模块系统
		模块作用域
		使用require方法用来加载模块
		使用exports接口对象用来导出模块中的成员
	
	暴露对象的方式
		
		function add(x,y){
			return x+y;
		}
		
		exports.add = add		//导出一个对象，具有add方法
		module.exports = add	//不再导出对象，只导出add方法，

exports 与 module-exports 的区别
	
	在node中，每个模块内部都有一个自己的module对象，该对象中有一个成员：exports
	默认代码的最后由一句：return module.exports
	每次挂载对象的时候只要把内容挂载到 modlue.exports 上就可以，
	同时 exports === module.exports
	也就是说  exports.a  === module.exports.a
	
	但是 当一个模块需要到处单个成员的时候，直接给exports赋值是无效的
	因为 exports只是module.exports 的一个引用，直接赋值的话就等于另创建了一个对象
	所以还是直接赋值给 module.exports = a;

require 加载规则
	
	优先从缓存中加载		
	判断模块标识
		核心模块
		第三方模块
		自己写的模块
	
	模块查找规则
		优先从缓存中加载
		核心模块
		路径形式的文件模块
		第三方模块
			node_modules/art-template/
			node_modules/art-template/package.json
			node_modules/art-template/package.json main
			index.js备选项
			进入上一级目录找 node_modules
			按照这个规则一次往上找，直到磁盘根目录还找不到，报错
	
	
npm
	
	node package manager - npm
	
	npm 常用命令
		npm init
			npm init -y
		npm install
			一次性吧dependencies 选项中的依赖项全部安装
		npm install 包名
			只下载
		npm install 包名 --save
			下载依赖项并保存(package.json文件中的dependencies选项)
			npm i -S 包名
		npm uninstall 包名
			只删除，如果有依赖项会依然保存
			npm un 包名
		npm uninstall --save 包名
			删除的同时也会把依赖信息去除
			npm un -S 包名
		npm help 
			查看使用帮助
		npm 命令 --help
			查看指定命令的使用帮助

	npm 被墙问题
		淘宝npm镜像 http://npm.taobao.org/
		安装淘宝的cnpm:
			npm install --global cnpm
		
		不想安装cnpm又想使用淘宝的服务器来下载：
			npm install jquery --registery=https://registry.npm.taobao.org
		但是每一次手动加参数比较麻烦，可以把这个选项加入配置文件中：
			npm config set registry https://registry.npm.taobao.org
			配置完成后，以后所有的npm install 都会默认通过淘宝的服务器来下载
			
		查看 npm 配置信息
			npm config list
		
package.json
	
	包描述文件：项目依赖的文件及项目相关信息
	npm i art-template --save		在package.json 中的dependencies中记录安装的包
	这样在以后node_module删除后  使用 npm install 即可初始化恢复 

### Express
	
	第三方web开发框架
	高度封装了http模块
	更加专注于业务，而非底层细节

增删改查
	
	使用文件来保存数据（锻炼异步编码）
Mongodb
	所有方法都封装好了