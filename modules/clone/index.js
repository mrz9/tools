/**
 * 深拷贝
 * @param {*} b 需要拷贝的内容
 */
function clone(b){
    var a;
    switch(toString.call(b)){
        // case "[object Number]":
        // case "[object String]":
        // case "[object Boolean]":
        //     a = b;
        //     break;
        case "[object Function]":
            a = new Function('return '+b.toString())();
            break;
        case "[object Array]":
            a = [];
            for(var key in b){
                a[key] = clone(b[key]);
            }
            break;
        case "[object Object]":
            a = {}
            for(var key in b){
                a[key] = clone(b[key]);
            }
            break;
        default:
            a = b;
            break;
    }
    return a;
}