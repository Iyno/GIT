
const bodyParser = require('body-parser');
const express = require('express');
// 创建网站服务器
const app = express();


app.get('/index/:id/:name/:age', (req,res) => {
    //接收post请求
    res.send(req.params);
})

app.listen(3000);
