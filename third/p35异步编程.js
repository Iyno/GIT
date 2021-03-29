/*5.1同步API，异步API
//路径拼接
const public = path.join(__dirname,'public');
//请求地址解析
const urlObj = url.parse(req.url);
//读取文件
fs.readFile('./demo.txt','utf8',(err,result) => {
    console.log(result);
})

同步API：只有当前API执行完成后，才能继续执行下一个API，如：
console.log('before');
console.log('before');

异步API：当前API的执行不会阻塞后续代码的执行
console.log('before');
setTimeout(() => {
    console.log('last');
}, 2000);
console.log('after');


5.2同步API，异步API的区别-获取返回值
同步API可以从返回值中拿到API执行的结果，但是异步API是不可以的
同步：
function sum(n1,n2) {
    return n1 + n2;
}

异步：
function getMsg() {
    setTimeout(() => {
        return{
            msg: 'hello nodejs'
        }
    }, 2000);
}
const msg = getMsg();

5.3回调函数--异步API通过回到函数可以拿到返回值
自己定义函数，让别人去调用
// getData函数定义
function getData(callback) {
// getData函数调用
getData( () => {})
}
代码示例：
function getMsg(callback) {
    setTimeout(function()  {
        callback({
            msg: 'hello nodejs'
        })
    }, 2000);
}
getMsg(function(data){
    console.log(data);
});


*/


// console.log('before');
// setTimeout(() => {
//     console.log('last');
// }, 2000);
// console.log('after');

// 同步
// function sum(n1,n2) {
//     return n1 + n2;
// }


function getMsg(callback) {
    setTimeout(function()  {
        callback({
            msg: 'hello nodejs'
        })
    }, 2000);
}
getMsg(function(data){
    console.log(data);
});

// function getData(callback) {
//     callback()
// }

// getData(function() {
//     console.log('callback函数被调用了');
// })