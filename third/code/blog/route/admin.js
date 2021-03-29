const express = require('express');
// 导入用户集合构造函数
const { User } = require('../model/user');
const bcrypt = require ('bcrypt');

//创建博客展示页面路由
const admin = express.Router();

// 渲染登录页面
admin.get('/login',require('./admin/loginPage'));
//实现登录功能
admin.post('/login', require('./admin/login'))

// 创建用户列表路由
admin.get('/user', require('./admin/userPage'))

// 实现退出功能
admin.get('./logout', require('./admin/logout'));

// 创建用户编辑页面路由
admin.get('/user-edit',require('./admin/user-edit'));

// 创建实现用户添加功能路由
admin.post('/user-edit',require('./admin/user-edit-fn'));
// 将路由对象作为模块成员进行导出
module.exports = admin;