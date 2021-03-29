function serializeToJason(form) {
    var result = {};
    // 将数组转换成对象{email: '22@qq.com',password: '124'}
    var f = form.serializeArray();
    f.forEach(function(item) {
        // result.email
        result[item.name] = item.value;
    });
    return result;

}