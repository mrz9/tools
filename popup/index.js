/**
 * 弹窗插件，通用版 1.0
 * 约束：
 * 1. 插件接受的数据格式（必须包含）
 * {
 *   id: 1,
 *   name: 'xx',
 *   type: 'xxx', //表示改项的类型，用于区分节点，如果后端数据不需要区分类型，可以在过滤方法添加固定值该属性，要保证能区分各个节点
 *   is_sub: 1|0, // 1表示有下一级，0表示5无下级
 * }
 * 
 * 2. 判断单前是否选中的规则
 * ‘type(_pid)?_id' //当前项的类型， 父节点的id（如果有的话），但前项目的id
 * 
 */
;(function(){
    function _Popup(target,option){
        this.el = target;
        this.$uid = 0;
        this.$map = {};

        //记录状态
        this.status = {
            hasInit:false,
            hasFirstLoad:false
        }
        //配置项目
        this.$opt = {
            title:"弹窗",
            content: $(".popup-select-wrap")
        }

        //结果保存集合
        window.selected = this.selectArr = [];
        $.extend(this.$opt,option);

        this.bind();
    }

    _Popup.prototype.getUid = function(){
        return this.$uid++;
    }
    _Popup.prototype.add = function(item){
        var uid = this.getUid();
        return this.set(uid,item);
    }
    _Popup.prototype.set = function(id,item){
        item.uid = id;
        this.$map[id] = item;
        return id;
    }

    _Popup.prototype.get = function(id){
        return this.$map[id];
    }

    _Popup.prototype.bind = function(){
        var self = this;
        var $origin = $(this.$opt.content).find('.origin');
        var $selected = $(this.$opt.content).find('.selected');
        //绑定触发元素
        $(this.el).on("click",function(){
            layer.open({
                type: 1,
                title: self.$opt.title,
                shade: 0.3,
                maxmin: true,
                shadeClose: false,
                area: ['780px','600px'],
                content: self.$opt.content,
                btn: ['保存', '关闭'],
                btnAlign: 'c',
                yes:function(index, layero){
                    //成功回调
                    var rs = [];
                    $.each(self.selectArr,function(i,id){
                        var item = self.get(id);
                        if(item) rs.push(item);
                    })
                    typeof self.$opt.callback == 'function' && self.$opt.callback(self,rs);
                    layer.close(index);
                },
                success: function () {
                    if(!self.status.hasInit){
                        //初始化操作
                        self.status.hasInit = true;
                        typeof self.$opt.init== 'function' && self.$opt.init(function(rs){

                            //init 构建的uid一律为负数,注意需要构建match字段，通过此字段来确定是否勾选
                            var idx = -2;
                            $.each(rs,function(i,item){
                                self.selectArr.push(self.set(idx--,item));
                            })
                            leftCreate();
                        });
                        typeof self.$opt.load == 'function' && self.$opt.load({first:true},function(data){
                            //渲染
                            $origin.html(render(-1,data));
                            //检查是否已勾选
                            checkCheck($origin);
                            
                        });
                    }
                }
            });
        });

        //单选
        $origin.on("change",".check",function(e,ignoreCheckAll,ignoreRender){
            var _this = $(this),
                id = _this.val(),
                uid = _this.closest('li').data('uid');

            var p =_this.closest("ul").children(".checkall").find("input");
            var pid = p.val();

            var siblings = _this.closest('li').siblings('.child');

            if(this.checked){
                objToArr(uid);
                if(!ignoreCheckAll){
                    var flag = true;
                    siblings.each(function(){
                        if(!$(this).find('>label>input').is(':checked')){
                            flag = false;
                        }
                    });
                    p.prop('checked',flag);
                }
                
            }else{
                arrRemove(uid);
                p.prop('checked',false);
            }
            !ignoreRender && leftCreate();
        });

        //展开下级
        $origin.on("click",".has-child2",open);

        //全选操作
        $origin.on('change',".checkall input",function(){
            var checkboxs = $(this).closest('li').siblings(".child").find('>label>.check');
            if(this.checked){
                checkboxs.each(function(i){
                    if(!this.checked){
                        $(this).prop('checked',true).trigger('change',true);
                    }
                })
            }else{
                checkboxs.each(function(i){
                    if(this.checked){
                        $(this).prop('checked',false).trigger('change',true);
                    }
                })
            }
        });

        //左侧删除
        $selected.on("click",".fa-close",function(){
            var _this = $(this);
            _this.parents("li").remove();
            var uid = _this.closest('li').data('uid');
            var match = _this.closest('li').data('match');
            arrRemove(uid);
            $origin.find("[data-match='"+match+"']").prop('checked',false).trigger('change');
        });

        //加载下一级数据
        function open(){
            var _this = $(this),
                _parent = _this.closest("li"),
                uid = _parent.data('uid');
               

            if(_parent.hasClass("open")){
                _parent.removeClass("open");
            }else{
                //不关闭已展开的，感觉页面交互有点怪
                // _parent.siblings("li").removeClass("open");
                _parent.addClass("open");

            }
            if(_this.hasClass('load-empty')){
                layer.msg('没有下级数据');
            }else if(!_this.hasClass('load-done')){

                var uitem = self.get(uid);
                if(!uitem) return false;

                typeof self.$opt.load == 'function' && self.$opt.load(uitem,function(data){
                    if(!data.length){
                        _this.addClass('load-empty');
                        layer.msg('没有下级数据');
                        return false;
                    }
                    var html = render(uid,data);
                    if(html){
                        _this.siblings("ul").html( html);
                        _this.addClass('load-done');
                        checkCheck(_this.siblings('ul'));
                    }
                })
            }else{
                checkCheck(_this.siblings('ul'));
            }
        }
        

        /**
         * 渲染树
         * @param {Int} uid 被插入节点的uid，如果没有上级则约定等于 -1
         * @param {Array} data 数组
         */
        function render(uid,data){
            var html= '';
            if(data && data.length){
                html += '<li class="checkall"><label ><input type="checkbox">全选</label></li>';
                $.each(data,function(i,item){
                    var match = item.type + '_' ;
                    if(uid !== -1){//存在父级的情况
                        var parent = self.get(uid);
                        item.parent = parent;
                        match += parent.id +'_'
                    }
                    match += item.id;
                    item.match = match;
                    var suid = self.add(item);
                    html += '<li class="item child" data-uid="'+suid+'">'+
                    '<label ><input type="checkbox" class="check" value="'+item.id+'" data-match="'+item.match+'">'+item.name+'</label> ';
                    if(item.is_sub == 1 || (item.child && item.child.length)){//有下一级的情况
                        var hasChildData = item.child && item.child.length;
                        html +='<a href="javascript:;" class="has-child2 ' + (hasChildData ? 'load-done':'') +'"></a>'+
                        '<ul>';
                        if(hasChildData){
                            html += render(suid,item.child);
                        }
                        html +='</ul></li>'
                    }
                });
            }
            
            return html;
        }


        //判断是否以加入数组中
        function checkCheck(_this){
            /**
             * 检查勾选的规则是
             * type(_pid)?_id
             * 这种规则适合有type类型返回并且同级不可能存在类型和id相同，
             * 或者不同级别的情况（此处就记录两级），不可能存在类型且上下两级的id同时相同的数据
             */

            var li = $selected.find('ul>li');
            li.each(function(){
                var ck = _this.find('[type=checkbox][data-match="'+$(this).data('match')+'"]');
                if(ck.size()>0){
                    var uid = ck.closest('li').data('uid');
                    var ouid = $(this).data('uid');
                    $(this).attr('data-uid',uid);
                    arrRemove(ouid);
                    objToArr(uid);
                    ck.prop('checked',true).trigger('change',[false,true]);
                }
            })
        }
    
         //del
        function arrRemove(uid){
            //不能用id删除，有可能id相同
            var index = self.selectArr.indexOf(uid);
            if(index!=-1)
            self.selectArr.splice(index, 1)

        }
        //push
        function objToArr(uid){
            var index = self.selectArr.indexOf(uid);
            if(index == -1 ) self.selectArr.push(uid);
        }
        //左侧
        function leftCreate(){
            var leftstr = "";
            $.each(self.selectArr,function(i,id){
                var item = self.get(id);
                leftstr += '<li class="left-item" data-uid="'+item.uid+'" data-match="'+ item.match+'"><span>'+item.name+'</span> <i class="fa fa-close"></i></li>'
            })
            $selected.find("ul").html(leftstr);
        }
    }

    $.fn.taskPopup = function(option){
        //便于调试
        window.zPopup = window.zPoppip || [];
        var instance = new _Popup(this,option);
        window.zPopup.push(instance);
        return instance;
    }
})();
