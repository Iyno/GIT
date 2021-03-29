// 在模板文件当中，外链资源要写绝对路径

抽离模板的公共部分，放入公共模板中
1、新建一个公共文件夹common，新建header.art和asider.art把
   公共部分分别放进去
2、在有需要的文件中进行引入，如：
    {{include './common/header.art'}}
    示例代码：
   <body>
        <!-- 头部 -->
            {{include './common/header.art'}}
        <!-- /头部 -->
        <!-- 主体内容 -->
        <div class="content">
            <!-- 侧边栏 -->
            {{include './common/asider.art'}}
            <!-- 侧边栏 -->
            <div class="main">
            ...
3、在路由中添加路由路径就能访问
    

2 项目功能实现
2.1 登录
1、创建用户集合，初始化用户
    1）连接数据库
    2）创建用户集合
    3）初始化用户
2、为登录表单项设置请求地址、请求方式以及表单项name属性
3、当用户点击登录按钮时，客户端验证用户是否填写了登录表单
4、如果其中一项没有输入，阻止表单提价
5、服务器端接收请求参数，验证用户是否填写了登录表单
6、如果其中一项没有输入，为客户端做出响应，阻止程序向下执行
7、根据邮箱地址查询用户信息
8、如果用户不存在，为客户端做出响应，阻止程序向下执行
9、如果用户存在，将用户名和密码进行比对
10、比对成功，用户登录成功
11、比对失败，用户登录失败

3.1 密码加密 bcrypt
哈希加密是单程加密方式：123 => abcd
在加密的密码中加入随机字符串可以增加密码被破旧的难度
代码示例：
//导入bcrypt模块
const bcrypt = require('bcrypt');
//生成随机字符串 gen => generate 生成salt盐
let salt = await bcrypt.genSalt(10);
//使用随机字符串对密码进行加密
let pass = await bcrypt.hash('明文密码',salt)

密码比对
let isEqual = await bcrypt.compare('明文密码','加密密码');

bcrypt依赖的其他环境
1、python 2.x 
2、node-gyp
npm install -g node-gyp
3、windows-build-tools
npm install --global --production windows-build-tools


3.2 cookie与session
cookie： 浏览器在电脑硬盘中开辟的一块空间，主要供服务器端存储数据
1、cookie中的数据是以域名的形式进行区分的
2、cookie中的数据是有过期时间的，超过时间数据会被浏览器自动删除
3、cookie中的数据会随着请求被自动发送到服务器端


session：实际上就是一个对象，存储在服务器端的内存中，在session对象中也可以存储
多条数据，每一条数据都有一个sessionid作为唯一标识

node.js中需要借助express-session实现session功能
const session = require('express-session');
app.use(session({secret: 'secret key'}))

2.2新增用户
1、为用户列表的新增用户按钮添加链接
view/admin/user.art文件
<a href="/admin/user-edit" class="btn btn-primary new">新增用户</a>

2、添加一个链接对应的路由，在路由处理函数中渲染新增用户模板
route/admin/admin.js文件
// 创建用户编辑页面路由
admin.get('/user-edit',require('./admin/user-edit'));
./admin/user-edit的代码：
module.exports = (req,res) => {
    res.render('admin/user-edit');
}


3、为新增用户表单指定请求地址、请求方式、为表单项添加name属性
<form class="form-container" action="/admin/user-edit" method="post">

<div class="form-group">
        <label>用户名</label>
        <input name ="username" type="text" class="form-control" placeholder="请输入用户名">
</div>


4、增加实现添加用户的功能路由
route/admin/admin.js文件

5、接受到客户端传递过来的请求参数
6、对请求参数的格式进行验证
7、验证当前要注册的邮箱地址是否已经注册过
8、对密码进行加密处理
9、将用户信息添加到数据库中
10、重定向页面到用户列表页面


3.项目包含的知识点
3.3 Joi
JavaScript对象的规则描述语言和验证器
const Joi = require('Joi)