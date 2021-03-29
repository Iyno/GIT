/**
 * 
 * 5.9异步函数
异步函数是异步编程语法的终极解决方案，它可以让我们异步代码写成同步的形式，
让代码不再有回调函数嵌套，使代码变得清晰明了。
const fn = async () => {};
async function fu (){}
async关键字
1、在普通函数前面加上async该函数就变成了异步函数
2、异步函数默认返回promise对象
3、在异步函数内部使用return关键字进行结果返回 结果会被包裹在promise对象中
   return关键字代替了resolve方法
4、在异步函数中使用throw关键字抛出程序异常
5、调用异步函数再链式调用then方法获取异步函数执行结果
6、调用异步函数再链式调用catch方法获取异步函数执行的错误信息


1、在普通函数定义的前面加上async关键字 普通函数就变成了异步函数
2、异步函数默认的返回值是promise对象
3、在异步函数内部使用throw关键字进行错误的抛出

await关键字
1、它只能出现在异步函数中
2、await promise await后面只能写promise对象，写其他类型的aip是不可以的
3、await promise 它可以暂停异步函数的执行，
等待promise对象返回结果后再向下执行
 * 
 */

async function fn () {
    throw '发生了错误';
    return 123;
}

fn().then(function(data){
    console.log(data);
})
.catch(function(err) {
    console.log(err);
}) 

// 让函数依次执行
async function p1() {
    return 'p1';
}
async function p2() {
    return 'p2';
}
async function p3() {
    return 'p3';
}

async function run() {
    let r1 = await p1()
    let r2 = await p2()
    let r3 = await p3()
    console.log(r1);
    console.log(r2);
    console.log(r3);

}