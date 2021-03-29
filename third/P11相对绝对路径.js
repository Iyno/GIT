const fs = require('fs');
const path = require('path');

console.log(__dirname);
console.log(path.join(__dirname,'01.js'));

fs.readFile(path.join(__dirname,'01.js'),'utf8',(err,doc) => {
    console.log(err);
    console.log(doc);
})





// 3.5相对路径和绝对路径
//    1、大多数情况下使用绝对路径，因为相对路径有时候相对的是命令行工具的当前工作目录
//    2、在读取文件或者设置文件路径时都会选择绝对路径
//    3、使用__dirname获取当前文件所在的绝对路径
const path = require('path');
fs.readFile(path.join(__dirname,'01.js'),'utf8',(err,doc) => {
    console.log(err);
    console.log(doc);
})     