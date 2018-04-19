const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const app = http.createServer();

//3.添加响应事件
app.on('request', function (req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    if(req.url == '/'){
        if(req.method == 'POST'){
            if(req.headers['content-type'].indexOf('multipart/form-data')!==-1){
                req.setEncoding('binary'); 
                var body = '';   // 文件数据
                var fileName = '';  // 文件名
                // 边界字符串
                var boundary = req.headers['content-type'].split('; ')[1].replace('boundary=','');
                req.on('data', function(chunk){
                  body += chunk;
                });
              
                req.on('end', function() {      
                  var file = querystring.parse(body, '\r\n', ':')
                    //获取文件名
                    var fileInfo = file['Content-Disposition'].split('; ');
                    for (value in fileInfo){
                      if (fileInfo[value].indexOf("filename=") != -1){
                        fileName = fileInfo[value].substring(10, fileInfo[value].length-1); 
              
                        if (fileName.indexOf('\\') != -1){
                          fileName = fileName.substring(fileName.lastIndexOf('\\')+1);
                        }
                      }   
                    }
              
                    // 获取图片类型(如：image/gif 或 image/png))
                    var entireData = body.toString();           
              
                    contentType = file['Content-Type'].substring(1); 
              
                    //获取文件二进制数据开始位置，即contentType的结尾
                    var upperBoundary = entireData.indexOf(contentType) + contentType.length; 
                    var shorterData = entireData.substring(upperBoundary); 
              
                    // 替换开始位置的空格
                    var binaryDataAlmost = shorterData.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
              
                    // 去除数据末尾的额外数据，即: "--"+ boundary + "--"
                    var binaryData = binaryDataAlmost.substring(0, binaryDataAlmost.indexOf('--'+boundary+'--'));        
              
                    // 保存文件
                    fs.writeFile(fileName, binaryData, 'binary', function(err) {
                      res.end('upload success');
                    });
                
                });
            }
        }else{
            res.end(fs.readFileSync('index.html'));
        }
    }else{
        res.end('200');
    }
});

//4.监听端口号
app.listen(3000, function () {
    console.log('welcome');
});