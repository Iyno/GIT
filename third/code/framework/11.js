
const bodyParser = require('body-parser');
const express = require('express');
// 创建网站服务器
const app = express();

// app.use方法传递了个函数作为参数，但是其实接收的还是这个函数的返回值
app.use(fn({a: 2}))

function fn(obj) {
    return function(req,res,next) {
        if (obj.a == 1) {
            console.log(req.url);
            
        } else {
            console.log(req.method);
        }
    }
}
app.get('/', (req,res) => {
    //接收post请求
    res.send(req.body)
})

app.listen(3000);
