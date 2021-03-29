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

//查找到一条文档并且删除-返回删除的文档
// 如果查询条件匹配了多个文档，那么将会删除第一个匹配的文档
// User.findOneAndDelete({_id:'5ff0152a3f2d1d518afa7be8'}).then(
//     result => console.log(result)
// )

// User.deleteMany({}).then(result => console.log(result))
// 更新单个
// User.updateOne({name:'heli'},{name: 'up'}).then(result => console.log(result))
// 更新多个数据，第一个{是查询条件}第二个{是更新的内容}
User.updateMany({},{age: 56}).then(result => console.log(result))