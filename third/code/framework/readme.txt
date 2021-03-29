
 01.js 框架介绍
 02.js 中间件概念
 03.js app.use的方法使用
 04.js 中间件应用
 05.js 错误处理中间件
 06.js 异步函数错误处理中间件
 07.js 构建模块化路由的基础代码
 08.js 构建模块化路由
 09.js 如何获取get请求参数
 10.js 如何获取post请求参数
 11.js app.use方法的讲解
 12.js 路由参数



 Express框架简介及初体验
 1.1express框架是什么
 express是一个基于node平台的web应用开发框架，它提供了一系列强大特性，帮助
 你创建各种web应用。
 下载命令：npm install express
 1.2express框架特性
    1、提供了方便简介的路由定义方式
    2、对获取http请求参数进行了简化处理
    3、对模板引擎支持度高，方便渲染动态html页面
    4、提供了中间件机制有效控制http请求
    5、拥有大量第三方中间件对功能进行扩展

1.3原生js与express框架对比之路由
1.4原生js与express框架对比之获取请求参数

示例代码：
//引入express框架
const express = require('express');
//创建网站服务器
const app = express();

app.get('/',(req,res) => {
    //send()
    // 1、send方法内部会检测响应内容的类型
    // 2、send方法会自动设置http状态码
    // 3、send方法会帮助我们自动设置响应的内容类型及编码
    res.send('hello express.');

}) 
app.get('/list',(req,res) => {
    res.send({name:'张三',age: 20})
})
//监听端口
app.listen(3000);
console.log('网站服务器启动成功');


2.1什么是中间件
中间件就是一堆方法，可以接收客户端发过来的请求、可以对请求做出响应，
也可以将请求继续交给下一个中间件继续处理
图略
nodemon no.js

中间件主要是由两部分构成，中间件方法以及请求处理函数。
中间件方法由express提供，负责拦截请求，请求处理函数由开发人员提供，
负责处理请求
app.get('请求路径','处理函数') //接收处理get请求
app.post('请求路径','处理函数') //接收处理post请求

可以针对同一个请求设置多个中间件，对同一个请求进行多次处理
默认情况下，请求从上到下依次匹配中间件，一旦匹配成功，终止匹配。
可以调用next方法将请求的控制权交给下一个中间件，直到遇到结束请求的中间件
app.get('/request',(req,res,next) => {
    req.name = "张三";
    next();
})

app.get('/request',(req,res) => {
    res.send(req.name)
})

2.2app.use中间件用法
app.use 匹配所有的请求方式，可以直接传入请求处理函数，代表接收所有的请求
app.use((req,res,next) => {
    console.log(req.url);
    next();
});

app.use 第一个参数也可以传入请求地址，代表不论什么请求方式，只要是这个
请求地址就接收这个请求
app.use('/admin',(req,res,next) =>{
    console.log(req.url);
    next()
});

2.3 中间件应用
1、路由保护，客户端在访问需要登录的页面时，可以先使用中间判断用户登录状态
，用户如果未登录，则拦截请求，直接响应，禁止用户进入需要登录的页面

2、网站维护公共，在所有路由的最上面定义接收所有请求的中间件，直接为客户端
做出响应，网站正在维护中
3、自定义404页面

2.4错误处理中间件
在程序的执行过程中，不可避免的会出现一些无法预料的错误，比如文件读取失败，
数据库连接失败等。错误处理中间件是一个集中处理错误的地方。
app.use((err,req,res,next) => {
    res.status(500).send('服务器发生未知错误')
})

当程序出现错误时，调用next()方法，并且将错误信息通过参数的形式传递给
next()方法，即可触发错误处理中间件
app.get("/",(req,res,next) => {
    fs.readFile("/file-does-not-exist",(err,data) => {
        if(err) {
            next(err);
        }
    })
})

2.5捕获错误
在node.js中，异步API的错误信息都是通过回调函数获取的，支持promise对象
的异步API发生错误可以通过catch方法捕获。
异步函数执行如果发生错误要如何捕获错误呢？

try catch 可以捕获异步函数以及其他同步代码在执行过程中发生的错误，但是
不能是其他类型的API发生的错误
app.get("/",async (req,res,next) => {
    tyr {
        await User.find({name: 'lili'})
    }catch(ex) {
        next(ex)
    }
})

3 Express请求处理
3.1 构建模块化路由
const express = require('express');
创建路由对象
const home = express.Router();
将路由和请求路径进行匹配
app.use('/home',home);
在home路由下继续创建路由
home.get('/index',() => {
    // /home/index
    res.send('欢迎来到博客首页')
})

引入其他模块的路由的方法
//home.js
const express = require('express');
const home = express.Router();
home.get('/index',(req,res) => {
    res.send('欢迎来到博客首页页面')
});
module.exports = home;

//admin.js
const express = require('express');
const admin = express.Router();
admin.get('/index',(req,res) => {
    res.send('欢迎来到博客管理页面')
});
module.exports = admin;

//app.js
const express = require('express');
// 创建网站服务器
const app = express();
const home = require('./route/home');
const admin = require('./route/admin');
app.use('/home',home);
app.use('/admin',admin);
app.listen(3000);

2.3get参数的获取
express框架中使用req.query即可获取GET参数，框架内部会将GET参数转换为对象并返回
//接收地址栏中问号后面的参数
//例如：http://localhost:3000/index?=name=zhangsan&age=20&sex=male

app.get('/index',(req,res) => {
    //获取get请求参数
    res.send(req.query);//{"age":"20","sex":"male"}
})

2.4post参数的获取
express中接收post参数需要借助第三方包  body-parser
//引入body-parser模块
const bodyParser = require('body-parser');
const express = require('express');
// 创建网站服务器
const app = express();

//拦截所有的请求用app.use方法
// extended:false 方法内部使用querystring模块处理请求参数的格式
// extended:true 方法内部使用第三方模块qs处理请求参数的格式
配置body-parser模块
app.use(bodyParser.urlencoded({extended: false}))
app.post('/add', (req,res) => {
    //接收post请求
    res.send(req.body)
})

app.listen(3000);


2.5 Express路由参数
获取路由参数
app.get('/find/:id',(req,res) => {
    console.log(req.params);//{"id":"123"}
})
localhost:3000/find/123

2.6静态资源的处理
通过express内置的express.static可以方便的托管静态文件，
如img、css、JavaScript文件等

app.use(express.static('public'))
app.use(express.static(path.join(__dirname,'public')))


现在，public目录下的文件就可以访问了
http://localhost:3000/index.html
http://localhost:3000/css/base.css


3 express-art-template模板引擎
模板引擎
为了使art-template模板引擎能够更好的和express框架结合，
模板引擎官方在原art-template模板引擎的基础上封装了express-art-template

使用npm install art-template express-art-template 命令安装
代码示例：

// 1、告诉express框架使用什么模块引擎渲染什么后缀的模板文件
// 参数：1）模板后缀；2）使用的模板引擎
app.engine('art',require('express-art-template'))
// 2、告诉express框架模板存放的位置是什么
app.set('views',path.join(__dirname,'views'))
// 3、告诉express框架模板的默认后缀时什么
app.set('view engine','art');

app.get('/index',(req,res) => {
    //render方法的作用1、拼接了模板路径；2、拼接模板后缀；
    // 3、哪一个模板和哪一个数据进行拼接；4、将拼接结果响应给客户端
    res.render('index',{
        msg: 'message'
    })
});

-app.locals对象
将变量设置到app.locals对象下面，这个数据在所有的模板中都可以
获取到
app.locals.users = [{
    name: 'zhangsan',
    age:20
},{
    name: 'zhangsan',
    age:20
}]


1.2 案例初始化
1、建立项目所需文件夹
   public 静态资源
   model 数据库操作
   route 路由
   views 模板
2、初始化项目描述文件
   npm init -y
3、下载项目所需第三方模块
   npm install express mongoose art-template express-art-template
4、创建网站服务器
5、构建模块化路由
6、构建博客管理页面模块