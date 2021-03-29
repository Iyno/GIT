
const path = require('path');
const express = require('express');
// 创建网站服务器
const app = express();

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
app.get('/list',(req,res) => {
    res.render('list',{
        msg: 'list page'
    })
})


app.listen(3000);
