const express = require('express');

//创建博客展示页面路由
const home = express.Router();

home.get('/',(req,res) => {
    res.send('欢迎来到blog首页')
})

// 将路由对象作为模块成员进行导出
module.exports = home;