var url = require('url')

var obj = url.parse('/pinglun?name=宝宝辉&message=江山如此多娇')
console.log(obj)
console.log(obj.query)