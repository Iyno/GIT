const http = require('http');

// 创建web服务器,app就是网站服务器对象
const app = http.createServer();
//当客户端有请求过来的时候
app.on('request',(req,res) => {


});
// 监听3000端口
app.listen(1000);
console.log('服务已经启动，监听3000端口，请范围localhost:3000');

