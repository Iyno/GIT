// js代码
// 创建web服务器模块
//引用系统模块--当。。做。。事情
const http = require('http');
//用于处理url地址
const url = require('url')

// 创建web服务器,app就是网站服务器对象
const app = http.createServer();
// 当客户端发送请求的时候
app.on('request',(req,res) => {
    // 获取请求方式
    //req.method
    //获取请求地址--根据不同地址访问不同内容
    //req.url
    // console.log(req.url);
    // console.log(url.parse(req.url));
    

    // 获取请求报文信息req.header 
    // console.log(req.headers['accept']);

    // 响应res
    res.writeHead(200, {
        'content-type': 'text/html;charset=utf8'
    });

    // console.log(req.url);
    //以下参数的意义：1)要解析的url地址；2）将查询参数解析成对象形式
    // console.log(url.parse(req.url,true).query);
    // let params = url.parse(req.url,true).query;
    // console.log(params.name);
    // console.log(params.age);

    // 得到从地址中传递过去的name和age的值
    let { query,pathname } = url.parse(req.url,true);
    console.log(query.name);
    console.log(query.age);

// 判断客户端的地址 req.url=pathname pathname是不包含参数的请求地址
    if (pathname == '/index' || pathname == '/') {
        res.end('<h2>welcom to home 中文页面</h2>')
        
    } else if(pathname == '/list') {
        res.end('welcom to list')
    }else{
        res.end('not found')
    }

    // console.log(req.method);
    if (req.method == 'POST') {
        res.end('post')
        
    } else if (req.method == 'GET') {
        res.end('getkkkk')
        
    }
    // res.end('<h1>hi,user</h1>');
});
// 监听3000端口
app.listen(1000);
console.log('服务已经启动，监听3000端口，请范围localhost:3000');

