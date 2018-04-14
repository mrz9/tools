//1.导入http模块
var http = require('http');
//导入文件模块
var fs = require('fs');
//导入路径模块
var path = require('path');
//导入url模块
var url = require('url');
//2.创建服务器
var app = http.createServer();

const request = require('request')

//3.添加响应事件
app.on('request', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/

    //1.默认情况下，如果url路径中有中文，则会对中文进行URI编码，所以服务端要想获取中文需要对url进行URI解码
    // console.log(encodeURI(req.url));
    // 2.url.parse 方法可以将一个 URL 路径解析为一个方便操作的对象
    // 将第二个可选参数指定为 true， 表示将结果中的 query 解析为一个对象
    var parseObj = url.parse(req.url, true);
    // console.log(parseObj);
    var pathname = parseObj.pathname; //相当于无参数的url路径
    // console.log(pathname);
    // 这里将解析拿到的查询字符串对象作为一个属性挂载给 req 对象，这样的话在后续的代码中就可以直接通过 req.query 来获取查询字符串了
    req.query = parseObj.query;
    // console.log(req.query);
    if (pathname === '/search') {
        console.log('searc',parseObj.query)
        let query = parseObj.query;
        var options = { 
            method: 'GET',
            url: 'https://www.doutula.com/api/search',
            qs: { keyword: query.word, mime: '0', page: query.page },
            headers:{
                    'Postman-Token': '269f81f9-b16d-4969-b97c-6115c31d9cd8',
                    'Cache-Control': 'no-cache' 
            },
            form: { department_id: '19', organization_id: '19' } };
        request(options, function (error, response, body) {
            if (error){
                res.end('{status:0,message:' + error.messag + '}');
                return false;
            }
            res.end(body);
        });
         
    } else {
        res.end('请求路径： ' + req.url);
    }
});

//4.监听端口号
app.listen(3000, function () {
    console.log('welcome');
});
