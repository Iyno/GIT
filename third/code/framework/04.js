//引入express框架
const express = require('express');
//创建网站服务器
const app = express();

// app.use((req,res,next) => {
//     res.send('网站正在维护...')
// })

app.use('/admin',(req,res,next) => {
    let isLogin = false;
    // 用户登录
    if (isLogin) {
        next()     
    }else (
        // 用户未登录
        res.send('您还没有登录，不能访问/admin页面')
    )
})

app.get('/admin',(req,res) => {
    res.send('您已经登录，可以访问当前页面')
})

app.use((req,res,next) => {
    // 为客户端响应404状态码
    res.status(404).send('当前页面不存在')
    
})
//监听端口
app.listen(3000);
console.log('网站服务器启动成功');
