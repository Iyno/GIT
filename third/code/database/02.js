const mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/playground',{useUnifiedTopology: true})
        .then(() => console.log('数据库连接成功'))
        .catch(err => console.log(err,'数据库连接失败'))

//创建集合规则-其实就是创建了一张表
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});

//使用规则创建集合--model方法创建集合
// 参数的意义：
//1、集合名称
// 2、集合规则
const Course = mongoose.model('Course', courseSchema)//courses

// 创建文档
const course = new Course({
    name: 'node.js基础',
    author: '黑马讲师',
    isPublished: true
});
// 调用save，将文档插入数据库中
course.save();