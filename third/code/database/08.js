const mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/playground',{useUnifiedTopology: true})
        .then(() => console.log('数据库连接成功'))
        .catch(err => console.log(err,'数据库连接失败'))

// 用户集合规则
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
// 文章集合规则
const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
// 用户集合
const User = mongoose.model('User',userSchema);
//文章集合
const Post = mongoose.model('Post',postSchema);

//创建用户
// User.create({name: 'itheima'}).then(result => console.log(result));
// 创建文章
// Post.create({title: '123',author: '5ff40613cb515e6342200488'}).then(result => console.log(result));
Post.find().populate('author').then(result => console.log(result))