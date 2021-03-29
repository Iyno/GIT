//导入模板引擎
const template = require('art-template');
const path = require('path')

const views = path.join(__dirname,'views','03.art');

const html = template(views,{
    users:[{
        name :'张三',
        age: 20,
        sex: '男'
    },{
        name :'张三',
        age: 20,
        sex: '男'
    },{
        name :'张三',
        age: 20,
        sex: '男'
    }
]
})

console.log(html);