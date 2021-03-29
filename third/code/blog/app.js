//引用express框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入bodyparser 用来处理post请求参数
const bodyParser = require('body-parser');
// 导入express-session模块
const session = require('express-session');

//创建网站服务器
const app = express();

//数据库连接，没有返回对象就不需要用对象来接收
require('./model/connect');
// require('./model/user');临时用的一句代码，创建用户

// 处理post请求参数-extended: false-用系统方法处理
app.use(bodyParser.urlencoded({extended: false}));

// 配置session
app.use(session({secret: 'secret key'}))

//告诉express框架模板所在的位置
app.set('views',path.join(__dirname,'views'));
// 告诉express框架的默认后缀是什么
app.set('view engine','art');
// 当渲染后缀为art的模板时，所使用的模板引擎是什么
app.engine('art',require('express-art-template'));

//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')))

// 引入路由对象
const home = require('./route/home');
const admin = require('./route/admin');
const { nextTick } = require('process');

// 拦截请求，判断用户登录状态-把实现的代码放到其他模块在进行引入
app.use('/admin', require('./middleware/loginGuard') )

//为路由匹配请求路径
app.use('/home',home);
app.use('/admin',admin)


//监听端口
app.listen(3000);
console.log('网站服务器启动成功，请访问localhost');