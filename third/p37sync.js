/*
5.5同步API，异步API的区别--代码执行顺序
同步API从上到下依次执行，前面代码会阻塞后面代码的执行
for(var i=0;i<100;i++){
    console.log(i);
}
console.log('for循环后面的代码');
异步API不会等待API执行完成后再向下执行
console.log('代码开始执行');
setTimeout(() => {
    console.log('延迟2秒');
}, 2000);
setTimeout(() => {
    console.log('0s');
}, 0);
console.log('代码结束执行');

5.6代码执行顺序分析
从上到下执行，遇到同步代码会放入同步代码执行区，
遇到异步代码会放入异步代码执行区
先执行完成同步代码执行区中的代码在去执行异步代码执行区中的代码
所以，代码执行顺序是：从上到下，先执行同步代码在执行异步代码，异步代码
的执行看条件和先后顺序

5.7Node.js中的异步API
fs.readFile('./form.html',(err,result) => {})

var server = http.createServer();
server.on('request',(req,res) => {})

如果异步API后面代码的执行依赖当前异步API的执行结果，但
实际上后续代码在执行的时候异步API还没有返回结果，这个问题要怎么解决？
fs.readFile('./form.html',(err,result) => {})
console.log('文件读取结果');
// 需求：依次读取文件A\B\C

5.8Promise
Promise出现的目的是解决nodejs异步编程中的回调地狱问题
let promise = new Promise((resolve,reject) => {
    setTimeout(() => {
        if (true) {
            resolve({name: 'zhangsan'})
        } else {
            reject('失败了')
        }
        
    }, 2000);

});
promise.then(result => console.log(result))

5.9异步函数
异步函数是异步编程语法的终极解决方案，它可以让我们异步代码写成同步的形式，
让代码不再有回调函数嵌套，使代码变得清晰明了。
const fn = async () => {};
async function fu (){}//在普通函数前面加上async该函数就变成了异步函数

*/

// 回调地狱
const fs = require('fs');
// const { resolve } = require('path');

// fs.readFile('./1.txt','utf8',(err,result1) =>{
//     console.log(result1);
//     fs.readFile('./2.txt','utf8',(err,result2) => {
//         console.log(result2);
//         fs.readFile('./3.txt','utf8',(err,result3) =>{
//             console.log(result3);
//         })
//     })
// });

function p1() {
    return  new Promise((resolve,reject) => {
        fs.readFile('./1.txt','utf8',(err,result) => {
            resolve(result)
        })
    });
}
function p2() {
    return new Promise((resolve,reject) => {
        fs.readFile('./2.txt','utf8',(err,result) => {
            resolve(result)
        })
    });
}

function p3() {
    return new Promise((resolve,reject) => {
        fs.readFile('./3.txt','utf8',(err,result) => {
            resolve(result)
        })
    });
}

p1().then((r1) => {
    console.log(r1);
    return p2();
})
.then((r2) => {
    console.log(r2);
    return p3();
})
.then((r3) => {
    console.log(r3);
})

// 解决方案：promis
// let promise = new Promise((resolve,reject) => {
//   fs.readFile('./3.txt','utf8',(err,result) => {
//       if (err != null) {
//           reject(err)
//       } else {
//           resolve(result);
//       }
//   })
// });
// promise.then((result) => {
//     console.log(result);

// })
// .catch((err) => {
//     console.log(err);
// })



