const path = require('path');

const finalPath = path.join('public','uploads','avata');

console.log(finalPath);




// 3.3 系统模块path  路径操作

// 为什么要进行路径拼接？
// 1、不同操作心痛的路径分隔符不统一
// 2、/public/uploads/avatar
// 3、windows是\/
// 4、linux上是/

// 3.4路径拼接语法
// Path2.join('路径','路径',...)
// 导入paht模块
// const path = require('path');
// // 拼接路径
// const finalPath = path.join('public','uploads','avata');
// // 输出结果
// console.log(finalPath);