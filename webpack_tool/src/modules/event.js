const u = !1;
module.exports = {
    o:function(a,b,d){
        a.attachEvent ? a.attachEvent("on" + b, function(b) {
            d.call(a, b)
        }) : a.addEventListener && a.addEventListener(b, d, u)
    },
    p : function(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = u
    }
}