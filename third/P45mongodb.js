// 1、数据库概述以及环境搭建
// 1.1为什么要使用数据库
//    1）动态网站中的数据都是存储在数据库中的
//    2）数据库可以用来持久存储客户端通过表单收集的用户信息
//    3）数据库软件本身可以对数据进行高效的管理

// 1.2什么是数据库
// 数据库即存储数据的仓库，可以将数据进行有序的分门别类的存储。
// 它是独立于语言之外的软件，可以通过API去操作它
// 常见数据库：mysql、mongodb
// $ brew services list
// $brew services start mongodb

/*

数据库概述及环境搭建
1.5数据库相关概念
在一个数据库软件中可以包含多个数据仓库，在每个数据仓库中可以包含
多个数据集合，每个数据集合中可以包含多条文档-具体的数据
1）database 数据库，mongodb数据库软件中可以建立多个数据库
2）collection 集合，一组数据的集合，可以理解为js中的数组
3）document 文档，一条具体的数据，可以理解为js中的对象
4）filed 字段，文档中的属性名称，可以理解为js中的对象属性

1.6mongoose第三方包
  1、使用node.js操作MongoDB数据库需要依赖node.js第三方包mongoose
  2、使用npm install mongoose命令下载

1.7启动mongodb
在终端输入：
brew services start mongodb

1.8数据库连接
使用mongoos提供的connect方法即可连接数据库
mongoose.connect('mongodb://localhost/playground',{useUnifiedTopology: true})
        .then(() => console.log('数据库连接成功'))
        .catch(err => console.log(err,'数据库连接失败'))

1.9创建数据库
在mongodb不需要显示创建数据库，如果正在使用的数据库不存在，MongoDB会自动创建


3.1 创建集合
创建集合分为两步：
1、对集合设定规则
2、创建集合
创建mongoose.Schema构造函数的实例即可创建集合
//创建集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
})

//使用规则创建集合
const Course = mongoose.model('Course', courseSchema)//courses

3.2创建文档
创建文档实际上就是向集合中插入数据
分为两步：
1、创建集合实例
2、调用实例对象下的save方法将数据保存到数据库中
const course = new Course({
    name: 'node.js基础',
    author: '黑马讲师',
    isPublished: true
});

course.save();

第二种插入文档的方法：--构造函数的create方法创建
Course.create({name:'js',author:'老师',isPublished:false},
(err,result) => {
    console.log(err);
    console.log(result);
})

Course.create({name:'js',author:'老师',isPublished:false})
        .then(result => {
            console.log(result);
        })
        .catch(err => {console.log(err);})
*/
