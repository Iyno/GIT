//将joi模块引入
const Joi = require('joi');


// 定义对象的验证规则
const schema = {
    username: Joi.string().min(2).max(5).required().error(new Error('username 没有通过验证')),
    birth: Joi.number().min(1800).max(2000)
};



async function run () {
    try {
        // 实施验证
       await Joi.validate({username: 'ab',birth: 1800}, schema);
// //    schema.validate({username: 'ab'});
//       schema.validate({ username: ''});       

    } catch (ex) {
        console.log(ex.message);
        return;
    }

     console.log('验证通过');
}

run();