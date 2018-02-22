! function () {
    var $cookie = {
        getItem: function (sKey) {
            if (!sKey) {
                return null;
            }
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                return false;
            }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        }
    };

    function zCaches(key) {
        //列表,type_id为key
        this.list = {};
        this.key = typeof key === 'string' ? key : 'dy_history';

        this._get();
    }

    zCaches.prototype.add = function (item) {
        if (this.check(item)) {
            this.list[item.type + '_' + item.id] = item;

            this.refresh();
        }
    }

    zCaches.prototype.delete = function (key) {
        if (this.list[key]) {
            delete this.list[key];
            this.refresh();
        }
    }

    zCaches.prototype._get = function(){
        var list = $cookie.getItem(this.key);
        if (list !== null) {
            try {
                var val = JSON.parse(list);
                this.list = val;
            } catch (e) {
                console.log(e);
            }
        }
    }

    zCaches.prototype.get = function () {
        this._get();
        var rs = [];
        var d = +new Date(),
            t = 30 * 24 * 3600 * 1000,
            len = 30;
        for(var key in this.list){
            var item = this.list[key];
            if(d - item.itime >= t){
                delete this.list[key];
            }else{
                rs.push(this.list[key]);
            }
        }
        rs = rs.sort(function(a,b){
            return a.itime<b.itime;
        }).splice(0,30);


        //更新list
        var newList = {};
        for(var i = 0,rlen = rs.length;i<rlen;i++){
            var item = rs[i];
            newList[item.type + '_' + item.id] = item;
        }

        this.list = newList;
        this.refresh();

        return rs;
    }

    zCaches.prototype.check = function (item) {
        if (toString.call(item) !== "[object Object]") return false;
        if (isNaN(item.id) || item.id == null || !item.cover || !item.title || !item.type) return false;
        return true;
    }

    zCaches.prototype.refresh = function () {
        $cookie.setItem(this.key, JSON.stringify(this.list), Infinity,'/');
    }
    window.zCaches = zCaches;
}();