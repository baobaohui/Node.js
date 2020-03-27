// 使用require ，exports 完成模块间通信，拿取数据
var ret = require('./5模块间通信2.js')

console.log(ret.foo)

console.log(ret.add(1,1))