var fs = require('fs');
var readline = require('readline');
var mime = require('mime');
var qiniu = require('qiniu');
	qiniu.conf.ACCESS_KEY = '70Iog28habwNHmPG59tD76rknhlSiXxWy9pRYPO6';
	qiniu.conf.SECRET_KEY = 'KlfH0ra3Cjdy0dRu9vCVN9fuCrM1q8L0OEynV0NX';
	//test
	//qiniu.conf.ACCESS_KEY = 'SF4jaBae_0eFpiRn6LzMrXIDJq-HhfY8T0BOC0as';
	//qiniu.conf.SECRET_KEY = 'Ble7oJjoERuTK6cU_XYK8A4Zb9Z_8IK602TMkcmg';


var bucketname,prefix='',isReplace,filePath = __dirname+'/',fileName,fileList=[],rl;

	function uptoken(bucket) {
	  var putPolicy = new qiniu.rs.PutPolicy(bucket);
	  //putPolicy.callbackUrl = callbackUrl;
	  //putPolicy.callbackBody = callbackBody;
	  //putPolicy.returnUrl = returnUrl;
	  //putPolicy.returnBody = returnBody;
	  //putPolicy.asyncOps = asyncOps;
	  //putPolicy.expires = expires;

	  return putPolicy.token();
	}

	function uploadBuf(body,mimeType, key, uptoken,callback) {
		  var extra = new qiniu.io.PutExtra();
		  //extra.params = params;
		  extra.mimeType = mimeType;
		  //extra.crc32 = crc32;
		  //extra.checkCrc = checkCrc;

		  //qiniu.io.putFile(uptoken, key, body, extra, function(err, ret) {
		  qiniu.io.put(uptoken, key, body, extra, function(err, ret) {
		    if (!err) {
		      // 上传成功， 处理返回值
		     // console.log(key+'上传成功');
		      // ret.key & ret.hash
		    } else {
		      // 上传失败， 处理返回代码
		     // console.log(key+'上传失败 error: '+err);
		      // http://developer.qiniu.com/docs/v6/api/reference/codes.html
		    }
		    if(callback) callback(err, ret);
		  });
		}

		// up2qiniu(files.file.name,files.file.type,files.file.path,function(){
			
		// });





		function up2qiniu(token,filename,mimetype,body,callback){
			uploadBuf(body,mimetype,prefix+filename, token,callback);

		}

		function getToken(isReplace,filename){
			return uptoken(bucketname + ((isReplace)?':'+prefix+filename:''));
		}


		function qiniuAction(){
			rl.close();
			var length = fileList.length;
			for(var i in fileList){
				(function(index){
					var token = getToken(isReplace,fileList[index]);
					//console.log("第"+index+"个token是："+token);
					if(token){
	  					loadFile(index,token,fileList[index]);
					}

				})(i);
			}
		}


		function loadFile(index,token,file,callback){
			console.log("第"+index+"个文件...")
			fs.readFile(filePath+file, "binary", function(error, data) {
			    if(error) {
			       console.log('>>>第'+index+'个文件读取失败 error: '+error);
			    } else {
			    	var type = mime.lookup(file);
				    up2qiniu(token,file,type,new Buffer(data,"binary"),function(err,ret){
				    	if(err){
				    		console.log('>>>第'+index+'个文件上传失败，空间位置：'+bucketname);
				    		console.dir(err);
				    		//loadFile(index,token,file,callback);
				    	}else{
				    		console.log('=====第'+index+'个文件上传成功 key :'+ret.key);
				    		if(callback) callback();
				    	}
					});

			       
			    }
			});
		}

		rl = readline.createInterface({
		  input: process.stdin,
		  output: process.stdout
		});

		

		function setBucketname(){
			var notice = '输入上传的空间名 :(默认resource) ';
			rl.question(notice, function(arg) {
			  // TODO: Log the answer in a database
			  if(Trim(arg)){
			  	bucketname = arg;
			  	setPrefix();
			  }else{
			  	bucketname = 'resource';
			  	setPrefix();
			  }

			});
		}

		function setPrefix(){
			var notice = '输入路劲前缀示例(frontend/v1.0.1/js/)：';
			rl.question(notice, function(arg) {
			  if(Trim(arg)){
			  	prefix = arg;
			  	setFilePath();
			  }else{
			  	//console.log('输入不能为空!');
			  	setFilePath();
			  }

			});
		}

		function setFileName(){
			var notice = '上传的文件名(上传全部输入*)';
			rl.question(notice, function(arg) {
			  // TODO: Log the answer in a database
			  if(Trim(arg)){
			  	if(arg === '*'){
			  		fs.readdir(filePath,function(err,files){
			  			if(err){
			  				console.log('目录路径有问题！！');
			  				setFilePath();
			  			}else{
		  					var length = files.length;
		  					if(length>0){
		  						for(var i in files){
		  							(function (index){
		  								fs.stat(filePath+files[index],function(err,stat){
		  									if(!stat.isDirectory()){
		  										fileList.push(files[index]);
		  									};
		  									//最后的循环
		  									if(index == length-1){
		  										if(fileList.length <= 0){
		  											console.log("这里没有文件哦，换个地方吧！");
		  											setFilePath();
		  										}else{
		  											fileName = arg;
		  											isRplace();
		  										}
		  									}
		  								});
		  							})(i);
		  						}
		  					}else{
		  						console.log("这里没有文件哦！");
		  						setFilePath();
		  					}
			  			}
			  		});
			  	}else{
			  		fs.realpath(filePath+arg, function (err, resolvedPath) {
			  		  if(err){
			  		  	console.log("当前文件不存在，你又玩我啊！！！"+filePath+arg);
			  		  	setFileName();
			  		  }else{
			  		  	fileName = arg;
			  		  	fileList.push(arg);
			  		  	isRplace();
			  		  }
			  		});
			  	}
			  }else{
			  	console.log('输入文件名啊！！！');
			  	setFileName();
			  }

			});
		}

		function setFilePath(){
			var notice = '输入本地目录(默认当前目录)';
			rl.question(notice, function(arg) {
			  // TODO: Log the answer in a database
			  if(Trim(arg)){
			  	fs.realpath(arg, function (err, resolvedPath) {
			  	  if(err){
			  	  	console.log("当前目录不存在，你玩我啊！！！");
			  	  	setFilePath();
			  	  }else{
			  	  	filePath = arg+'/';
			  	  	setFileName();
			  	  }
			  	});
			  	
			  }else{
			  	//console.log('本地目录是:' + filePath);
			  	setFileName();
			  }

			});
		}

		function isRplace(){
			var notice = '是否覆盖文件(yes/no) :';
			rl.question(notice, function(arg) {
			  if(Trim(arg)){
			  	arg = arg.toLowerCase();
			  	switch(arg){
			  		case 'yes':
			  			isReplace = true;
			  			qiniuAction();
			  			break;
			  		case 'no':
			  			isReplace = false;
			  			qiniuAction();
			  			break;
			  		default:
				  		console.log("输入正确的值啊！！！");
				  		isRplace();
				  		break;
			  	}
			  }else{
			  	console.log('输入不能为空!');
			  	isRplace();
			  }

			});
		}

		function Trim(str)
        { 
            return str.replace(/(^\s*)|(\s*$)/g, ""); 
	    }




		setBucketname();
		
