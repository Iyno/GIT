// 1、通过模块的名字fs对模块进行引用

const fs = require('fs');

// 2、通过模块内部的readFile读取文件内容
// fs.readFile('./third/P8readFile.js','utf-8',(err,doc) => {
//     // 如果文件读取出错err是一个对象，包含错误信息
//     // 如果文件读取争取 err是null
//     console.log(err);
//     console.log(doc);
// });

fs.writeFile('./third/index.html','写入的内容',err => {
    if (err != null) {
        console.log(err);
        return;
        
    }
    console.log('写入成功');
})







// 3.2系统模块fs 文件操作
// 2、写入文件内容：
// fs.writeFile('文件路径/文件名称','数据',callback)
fs.writeFile('./third/index.html','写入的内容',err => {
    if (err != null) {
        console.log(err);
        return;
        
    }
    console.log('写入成功');
})
