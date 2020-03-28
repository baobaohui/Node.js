## day2 Notes

请求对象Request

响应对象Response

在Node中使用模板引擎
	
	art-template 
	npm install art-template --save
	
	
统一处理静态资源
	
	Uniform Resource Locator,统一资源定位符
	
	
服务端渲染
	
	前端渲染	服务端渲染
	
	Ajax 渲染的数据不利于 SEO搜索引擎优化 Search Engine Optimization
	服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
	
	网站真实情况下是异步渲染+服务端渲染出来的
	例如：
		京东的商品列表采用服务端渲染，目的为了SEO
	    商品评论列表为了用户体验，且不需要SEO优化，所以采用客户端渲染
		
	
	
feedback