/**
 * 解析广告js
 */
const base64 = require('./base64.js');
const replace = require('./replace.js');
module.exports = function(data){
    let {code:ecode,rep,sec} = data;
    ecode = replace(ecode,rep);
    let arr = ecode.split(sec);
    for(var i = 0,len = arr.length;i<len;i++){
        var dc = base64.d(arr[i]);
        arr[i] = dc;
    }
    let [code,params,ids,tag_attr,code_type] = arr;
    let [ad_id,sad_id,site_id,user_id] = ids.split('_');
    
   return [code,params,tag_attr,Number(code_type),ad_id,sad_id,site_id,user_id];
}