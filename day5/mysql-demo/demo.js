//导入模块
var mysql = require('mysql');

//创建连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});
 
//连接
connection.connect();
 
//操作数据库
connection.query('select * from user', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
//关闭数据库
connection.end();