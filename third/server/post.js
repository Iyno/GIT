const http = require('http');
// 处理请求参数模块
const querystring = require('querystring');
// 创建web服务器,app就是网站服务器对象
const app = http.createServer();
//当客户端有请求过来的时候

app.on('request',(req,res) => {
    // post参数是通过事件的方式接收的
    // data 当请求参数传递的时候触发data事件
    // end 当请求参数完成的时候触发data事件

    let postParams = '';

    req.on('data', params => {
        postParams += params;
    });
    req.on('end',() => {
        // querystring.parse(postParams);
        console.log(querystring.parse(postParams));
    });

    res.end('ok');


});
// 监听3000端口
app.listen(3001);
console.log('服务已经启动，监听3000端口，请范围localhost:3001');

