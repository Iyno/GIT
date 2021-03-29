const mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/playground',{useUnifiedTopology: true})
        .then(() => console.log('数据库连接成功'))
        .catch(err => console.log(err,'数据库连接失败'))

//创建集合规则-其实就是创建了一张表
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password:String,
    hobbies:[String]
});

//使用规则创建集合--model方法创建集合
const User = mongoose.model('User', userSchema)

// 创建文档
const user = new User({
    name: 'heli',
    age: 22,
    email: '502222@qq.com',
    password:'a123456',
    hobbies:['游泳','唱歌','敲代码']
});
// 调用save，将文档插入数据库中
user.save();

// 查询用户集合中的所有文档
// User.find().then(result => console.log(result))

// 通过_id字段查找文档-数据
// User.find({_id: '5ff014cd5744564c6b1cdde3'}).then(result => console.log(result))

// findOne方法返回一条文档，默认返回当前集合的第一条数据
// User.findOne({name: 'admin'}).then(result => console.log(result))

//查询用户集合中年龄字段大于20小于40的用户
// User.find({age: {$gt:20,$lt:40}}).then(result => console.log(result))

// User.find({hobbies:{$in:['敲代码']}}).then(result => console.log(result))

//选择要查询的字段
// User.find().select('name email -_id').then(result => console.log(result))

// 根据年龄进行升序排列
// User.find().sort('age').then(result => console.log(result))
// // 根据年龄进行降序排列
// User.find().sort('-age').then(result => console.log(result))

// User.find().skip(2).limit(3).then(result => console.log(result))