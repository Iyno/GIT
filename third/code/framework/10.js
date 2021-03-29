
const bodyParser = require('body-parser');
const express = require('express');
// 创建网站服务器
const app = express();

//拦截所有的请求
// extended:false 方法内部使用querystring模块处理请求参数的格式
// extended:true 方法内部使用第三方模块qs处理请求参数的格式
app.use(bodyParser.urlencoded({extended: false}))
app.post('/add', (req,res) => {
    //接收post请求
    res.send(req.body)
})

app.listen(3000);
