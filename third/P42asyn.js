const fs = require ('fs');

// 这个promisify是用来改造现有异步函数挨批 让其返还promise对象
// 从而支持异步函数语法
const promisify = require('util').promisify;
// 调用promisify方法改造现有异步api 让其返回promise对象
const readFile = promisify(fs.readFile);

async function run() {
    let r1 = await readFile('./1.txt','utf8');
    let r2 = await readFile('./2.txt','utf8');
    let r3 = await readFile('./3.txt','utf8');
    console.log(r1);
    console.log(r2);
    console.log(r3);

}

run();