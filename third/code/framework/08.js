const express = require('express');
// 创建网站服务器
const app = express();

const home = require('./route/home');
const admin = require('./route/admin');

app.use('/home',home);
app.use('/admin',admin);


app.listen(3000);
