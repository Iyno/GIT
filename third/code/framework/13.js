
const path = require('path');
const express = require('express');
// 创建网站服务器
const app = express();



// 实现静态资源访问功能
app.use(express.static(path.join(__dirname,'public')))
// 访问路径：http://localhost:3000/index.html

app.use('/static',express.static(path.join(__dirname,'public')))
// 访问路径：http://localhost:3000/static/index.html

app.listen(3000);
