//创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入加密模块bcrypt
const bcrypt = require('bcrypt');

// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength:20
    },
    email: {
        type: String,
        // required: true,
        unique: true//保证邮箱地址不重复

    },
    password: {
        type: String,
        required: true
    },
    // admin：超级管理员
    // normal： 普通管理员
    role: {
        type: String,
        require: true
    },
    //0--启用状态；1-禁用状态
    state :{
        type: Number,
        default: 0
    }
})

//创建集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456',salt);
    const user = await User.create({
        username: 'itheima',
        email: 'itheima@itcast.cn',
        password: pass,
        role: 'admin',
        state: 0
    });
}

// createUser();
// 将用户集合作为模块成员进行导出
module.exports = {
    // 可以直接省略User
    User: User
}