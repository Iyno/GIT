//导入模板引擎
const template = require('art-template');
const path = require('path');
var dateFormat = require("dateformat");

// const views = path.join(__dirname,'views','06.art');

// 设置模板的根目录
template.defaults.root =  path.join(__dirname,'views');

// 配置模板的默认后缀
template.defaults.extname = '.html'

// 导入模板变量
template.defaults.imports.dateFormat = dateFormat;
const html = template('06.art',{
    time: new Date()
});
console.log(template('index',{})); 


console.log(html);