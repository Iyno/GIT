




// 4.1 什么是第三方模块
//     别写好的、具有特定功能的，我们能直接使用的模块即第三方模块，
//     由于第三方模块通常都是由多个文件组成并且被放置在一个文件夹中，
//     所以又名包

// 第三方模块有两种存在形式：
//     1、以js文件的形式存在，提供实现项目具体功能的API接口
//     2、以命令行工具形式存在，辅助项目开发

// 4.2获取第三方模块
// npmjs.com:第三方模块的存储和分发仓库
// npm ：node的第三方模块管理工具
//     1、下载：npm install 模块名称
//     2、删除：npm uninstall 模块名称

// 全局安装与本地安装
//     1、命令行工具：全局安装
//     2、库文件：本地安装

// 4.3第三方模块 nodemon 
//     nodemon是一个命令行工具，用以辅助项目开发
//     在node.js中，每次修改文件都要在命令行工具中重新执行该文件，非常繁琐

//     使用步骤：
//     1、使用 npm install nodemon -g 下载它
//     2、在命令行工具中用nodemon命令行替代node命令执行文件

// 4.4第三方模块 nrm 
//     nrm：npm下载地址切换工具
//     npm默认的下载地址在国外，国内下载速度比较慢

//     使用步骤：
//     1、使用npm install nrm -g 
//     2、查询nrm ls 
//     3、切换npm下载地址 nrm use 下载地址名--nrm use taobao

// 4.5 第三方模块 Gulp 
// 基于node平台开发的前端构建工具
// 将机械化操作编写成任务，想要执行机械化操作时执行一个命令行命令任务就能自动执行
// 用机器代替手工，提高开发效率

// 4.6 Gulp能做什么？
//     1、项目上线，html、css、js文件压缩合并
//     2、语法转换（es6\less...)
//     3、公共文件抽离
//     4、修改文件浏览器自动刷新

// 4.7 Gulp使用
//     1、使用npm install gulp 下载gulp库文件
//     2、在项目根目录下建立gulpfile.js文件
//     3、重构项目的文件夹结构src目录放置源代码文件  dist目录放置构建后文件
//     4、在gulpfile.js文件中编写任务
//     5、在命令行工具中执行gulp任务

// 4.8 gulp中提供的方法
//     1、gulp.src():获取任务要处理的文件
//     2、gulp.dist():输出文件
//     3、gulp.task():建立gulp任务
//     4、gulp.watch():监控文件变化

// 引用gulp模块
const gulp = require('gulp');
// 使用gulp.task建立任务
// 参数：1、任务的名称；2、任务的回调函数
gulp.task('first',() => {
    console.log('第一个gulp任务执行了');
    //1、使用gulp.src获取要处理的文件-复制操作：
    gulp.src('./src/css/base.css')
    //将处理后的文件输出到dist目录
        .pipe(gulp.dest('dist/css'));
});

// 执行任务first  
//第一步：安装一下npm install gulp-cli -g
// 第二步：使用gulp 任务名称（first）


// 4.9gulp插件
//     1、gulp-htmlmin:html文件压缩
//     2、gulp-csso:压缩css
//     3、gulp-babel:js语法转换
//     4、gulp-less:less语法转换
//     5、gulp-uglify:压缩混淆js
//     6、gulp-file-include公共文件包含
//     7、browsersync浏览器实时同步