
/** 
 * 6 package.json 文件
 * 6.1 node_modules文件夹的问题
    * 1、文件夹以及文件过多过碎，当我们将整个项目拷贝给别人时特别慢
    * 2、发展的模块依赖关系需要被记录，确保模块的版本和当前保持一致，否则
    * 当前项目运行会报错
 * 6.2 package.json文件的作用
 *    1、项目描述文件，记录了当前项目信息，例如项目名称、版本、作者
 * github地址、当前项目依赖了哪些第三方模块等
 *    2、使用：npm init -y命令生成package.json文件
 * 
 * 拷贝项目不用拷贝node_modules，有了package.json文件，直接在终端输入
 * :npm install 就会自动补全依赖库
 * 
 * 6.3项目依赖
 *    1、在项目的开发阶段和线上运营阶段，都需要依赖第三方包，称为项目依赖
 *    2、使用npm install 包命令下载的文件会默认被添加到package.json
 *      文件的depandencies字段中
    *      "dependencies": {
            "formidable": "^1.2.2",
            "mime": "^2.4.7"
    }
   6.4开发依赖
    1、在项目的开发阶段需要依赖，线上运营阶段不需要依赖的第三方包，称为开发依赖
    2、使用npm install包名 --save-dev命令将包添加到package.json文件的
        devDependencies字段中
        "devDependencies": {
            "gulp": "^4.0.2"
            }
        }
 * 
 *   应用场景：
 *          1、在开发的时候可以使用npm install--下载全部依赖
 *          2、在线上环境:npm install --production  只下载dependencies
 *          里的依赖库
 *
 * 6.5package-lock.json文件的作用
 *  1、锁定包的版本，确保再次下载时不会因为包版本不同而产生问题
 *  2、加快下载速度，因为该文件中已经记录了项目所依赖第三方包的
 *      树状结构和包的下载地址，重新安装时，只需要下载即可，不需要做额外的工作
 * 
 * 别名的用法：
 *      1、在package.json的script中写入
        *  "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "bu": "node app.js"
        },
        2、在终端执行：npm run bu--bu就是命令的别名


5. node.js中模块加载机制
   5.1模块查找规则-当模块拥有路径但没有后缀时
        require('./find.js);
        require('./find');
        1、require方法根据模块路径查找模块，如果是完整路径，直接引入模块；
        2、如果模块后缀省略，先找同名js文件找同名js文件夹
        3、如果找到了同名文件夹，找到文件夹中的index.js
        4、如果文件夹中没有index.js就会去找当前文件夹的package.js文件中查找main选项中的入口文件
        5、如果找指定的入口文件不存在或者没有指定入口文件就会报错，模块没有找到

        5.2模块查找规则-当模块没有路径且没有后缀时
        require('find);
            1、node.js会假设它是系统模块
            2、nodejs会去node_modules文件夹中
            3、首先看是否有该名字的js文件
            4、再看是否有该名字的文件夹
            5、如果文件夹看里面是否有index.js
            6、如果没有index.js查看该文件夹中的package.json中的main选项确定模块入口文件
            7、找不到则报错


    1.6URL
    统一资源定位符，又叫URL-Uniform Resource Locator,是专为标志internet
    网上资源位置而设的一种编址方式，我们平时所说的网页地址指的就是URL

    URL的组成
        1、传输协议：//服务器IP或域名:端口/资源所在位置标识
        2、htpp://www.itcast.cn/news/
        3、http:超文本传输协议，提供了一种发布和接收html页面的方法
    
    1.7开发过程中客户端和服务器端说明
    在开发阶段，客户端和服务器端使用同一台电脑，即开发人员电脑


    3.1 HTTP协议的概念
    超文本传输协议（http）规定了如何从网站服务器传输超文本到
    本地浏览器，它基于客户端服务器架构工作，是客户端（用户）和
    服务器（网站）请求和应答的标准

    3.2报文
    在http请求和响应的过程中传递的数据块叫报文，包括要传输的数据和一些
    附加信息，并且要遵守规定好的格式。

    3.3请求报文
    1、请求方式（Request Method）
       1)GET 请求数据
       2)POST 发送数据
    2、请求地址（request URL）
app.on('request',(req,res) => {
    req.headers;//获取请求报文
    req.url;//获取请求地址
    req.method//获取请求方法
})

    3.4响应报文
    1、HTTP状态码
       1）200请求成功
       2）404请求的资源没有被找到
       3）500服务器错误
       4）400客户端请求有语法错误
    2、内容类型
        1)text/html
        2)text/css
        3)application/javascript
        4)image/jpeg
        5)application/json
    4.HTTP请求与响应处理
    4.1请求参数
    客户端向服务器端发送请求时，有时候需要携带一些客户信息，客户
    信息需要通过请求参数的形式传递到服务器，比如登录操作

    4.2GET请求参数
    参数被放置在浏览器地址栏中，例如：
    http://localhost:300/?name=zhangsan&age=20

    //以下参数的意义：1)要解析的url地址--req.url；2）将查询参数解析成对象形式-true
    //query是返回的信息包含name和age的部分，所以后面就可以直接引用params.name
    // url.parse(req.url,true).query;
    // let params = url.parse(req.url,true).query;
    // console.log(params.name);
    // console.log(params.age);


    4.3 POST请求参数
        1、参数被放置在请求体重进行传输
        2、获取POST参数需要使用data事件和end事件
        3、使用querystring系统模块将参数转换为对象格式
        导入系统模块querysting用于将HTTP参数转换为对象格式
        const querysting = require('querystring);
        app.on('request',(req,res) => {
            let postData = '';
            监听参数传输事件
            req.on('data',(chunk) => postData += chunk;);
            监听参数传输完毕事件
            req.on('end',() => {
                console.log(querystring.parse(postData))
            })
        })

    4.4路由
    http://local:3000/index
    路由是指客户端请求地址与服务器端程序代码的对应关系。简单的说，就是请求什么响应什么

    app.on(request,(req,res) => {
        //获取客户端的请求路径
    const pathname = url.parse(req.url).pathname;
            if (method == 'get') {
        if (pathname == '/' || pathname == '/index') {
            res.end('欢迎来到首页')
        }else if (pathname == '/list'){
            res.end('欢迎来到列表页')
        }else {
            res.end('您访问的页面不存在')
        }
    })

    4.5静态资源
    服务器不需要处理，可以直接响应给客户端的资源就是静态资源，如css、js、image文件
    http://www.itcast.cn/images/logo.png

    4.6动态资源
    相同的请求地址不同的响应资源，这种资源就是动态资源
 * 

*/


