
const $uuid = require('./modules/uuid.js');
const $event = require('./modules/event.js');
const $parse = require('./modules/parse.js');

//统计业务开始
const host = "http://demo.xzb.com";
const uid = $uuid.get();
const t = window;

let ad_id = '${PHP_AD_ID}'; //用户广告id 生成本标签的时候已经固定

let fname = 'jsonp_' + (+new Date);

let uget = host + '/index.php?r=/adunion/adzone/codepower&ad_id=' + ad_id + '&browser='+ uid +'&callback='+ fname;
let usend = '/index.php?r=/adunion/adzone/count';

let head = document.getElementsByTagName("head")[0];
let script = document.createElement("script");
head.appendChild(script);
script.src = uget;
 
t[fname] = function(data){
    let [code,params,tag_attr,code_type,rad_id,sad_id,site_id,user_id] =  $parse(data);

    switch(code_type){
        case 1: //js代码
            new Function(code)();
            break;
        case 2: //单个的script标签 (外部引入的js，里面不支持document.write的写法)
            params = params.split('&');
            let script2 = document.createElement("script");
            let url = '';
            for(var i = 0,len = params.length;i<len;i++){
                let [key,val] = params[i].split('=');
                if(key === 'src') {
                    url = decodeURIComponent(val);
                    continue;
                };
                script2.setAttribute(key,val);
            }
            head.appendChild(script2);
            script2.src = url;
            break;
    }
    
    rad_id == ad_id && $event.o(document.body,'click',function(e){
        var el = e.target;
        if(el.tagName.toLocaleLowerCase() == 'img'){
            if(new RegExp('^https?://' + tag_attr).test(el.src)){
                (new Image).src = host + usend + `&user_id=${user_id}&ad_id=${ad_id}&sad_id=${sad_id}&site_id=${site_id}&browser=${uid}`;
            }
        }
    });

    t[fname] = '';
}
