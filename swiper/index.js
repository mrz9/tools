class Swiper{
    constructor(){
        this.swiper = document.querySelector('.zswiper');
        this.wrap = this.swiper.querySelector('.zswiper-wrap');
        
        this.timeHandle;

        this.time = 3;

        this.index = 0;

        this.width;
        this.length;
        this.update();
        window.addEventListener('resize',this.update);

        this.wrap.addEventListener('transitionend',()=>{
            this.wrap.style.transitionDuration = '0ms';
        });

        this.swiper.addEventListener('touchstart',moveStart)
        this.swiper.addEventListener('mousedown',moveStart)

        this.swiper.addEventListener('mousemove',moveMove)
        this.swiper.addEventListener('touchmove',moveMove)

        this.swiper.addEventListener('mousecancel',mouseEnd)
        this.swiper.addEventListener('touchcancel',mouseEnd)
        this.swiper.addEventListener('mouseup',mouseEnd)
        this.swiper.addEventListener('touchend',mouseEnd)


        let self =this;
        this.pos = {
            sx:0,
            sy:0,
            x:0,
            y:0,
            last:0
        }
        function moveStart(e){
            if(self.timeHandle){
                clearTimeout(self.timeHandle);
                self.timeHandle = 0;
            }
            self.pos.x = self.pos.sx = e.pageX
            self.pos.y = self.pos.sy  = e.pageY
            self.pos.last = self.index * self.width
        }

        function moveMove(e){
            if(self.pos.last == 0) return;
            let mx =  self.pos.x - e.pageX;
            self.pos.last+=mx;
            self.transform(Math.abs(self.pos.last));
            self.pos.x = e.pageX;
            self.pos.y = e.pageY;

            let ex = self.pos.sx - e.pageX
            if(Math.abs(ex) >= self.width / 3){
                var te = document.createEvent("MouseEvents");
                te.initEvent("mouseup", true, true);　　　　　　　　　　　　　　//这里的click可以换成你想触发的行为
                self.swiper.dispatchEvent(te);
            }
            
        }

        function mouseEnd(e){
            let mx = self.pos.sx - e.pageX
            if(Math.abs(mx) >= self.width / 3){
                console.log('end',mx)
                if(mx>0){
                    self.move(self.index + 1);
                }else{
                    self.move(self.index - 1);
                }
            }else{
                self.move(self.index);
            }

            self.pos = {
                x:0,
                y:0,
                sy:0,
                sx:0,
                last:0
            }
        }
    }
    
    move(step){
        if(this.timeHandle){
            clearTimeout(this.timeHandle);
            this.timeHandle = 0;
        }
        if(typeof step !== undefined && !isNaN(step)){
            step = step > this.length -1 ? 0 : step;
            this.transform(this.width * step );
            this.wrap.style.transitionDuration = '300ms';
            this.index = step;
            this.timeHandle = setTimeout(()=>this.move(this.index + 1),this.time * 1000);
        }
    }
    transform(px){
        console.log('transform',px)
        this.wrap.style.transform = "translate3d(-"+ px +"px, 0px, 0px)";
    }
    update(){
        console.log('update');
        if(this.timeHandle){
            clearTimeout(this.timeHandle);
            this.timeHandle = 0;
        }

        this.items = this.wrap.querySelectorAll('.zswiper-item');
        this.width = this.swiper.getBoundingClientRect().width;
        this.length = this.items.length;
        console.log(this.items);
        this.items.forEach((item)=>{
            console.log(item);
            item.style.width = this.width + 'px'
        });

        this.wrap.style.width = this.width * this.length + 'px';

        this.move(this.index);
    }
}

let store = Object.create(null);
let ic = {
    touch:()=>!!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch),

}

let getTranslate = function(el){
	var curStyle = window.getComputedStyle(el);
	var curTransform = curStyle.transform || curStyle.webkitTransform;
	var x,y; x = y = 0;
	curTransform = curTransform.split(', ');
	if (curTransform.length === 6) {
		x = parseInt(curTransform[4], 10);
		y = parseInt(curTransform[5], 10);
	}
       return {'x': x,'y': y};
};

let translate = function(ele, x, y, z){
    if (ic.support.transforms3d){
        transform(ele, 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
    } else {
        transform(ele, 'translate(' + x + 'px, ' + y + 'px)');
    }
};

let touchStart = function(e){
    //mouse事件会提供which值， e.which为3时表示按下鼠标右键，鼠标右键会触发mouseup，但右键不允许移动滑块
    if (!ic.support.touch && 'which' in e && e.which === 3) return;
    //获取起始坐标。TouchEvent使用e.targetTouches[0].pageX，MouseEvent使用e.pageX。
	state.startX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    state.startY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;

    state.target = e.target;
    //时间戳
    state.startTime = e.timeStamp;
    //state的touchStart 、touchMove、touchEnd代表是否进入该函数
	state.touchEnd = state.touchMove = false;
	state.touchStart = true;
    //表示滑块移动的距离
	state.diffX = state.diffY = 0;
}

let touchMove = function(e){
    // 1. 如果当前触发touchMove的元素和触发touchStart的元素不一致，不允许滑动。
    // 2. 执行touchMove时，需保证touchStart已执行，且touchEnd未执行。
    if(e.target !== state.target || state.touchEnd || !state.touchStart) return;
    state.touchMove = true;

    //取得当前坐标
    let currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    let currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    //如果轮播进行中，将定时器清除
    if(currStore.autoPlayID !== null){
        clearTimeout(currStore.autoPlayID);
        currStore.autoPlayID = null;
    }
    //判断移动方向是水平还是垂直
	if(currStore.direction === 'x'){
                //currStore.touchRatio是移动系数
		state.diffX = Math.round((currentX - state.startX) * currStore.touchRatio);
                //移动元素
		translate(currStore.container, state.animatingX + state.diffX + state.currStore.translateX, 0, 0);
    }else{
        state.diffY = Math.round((currentY - state.startY) * state.currStore.touchRatio);
        translate(currStore.container, 0, state.animatingY + state.diffY + state.currStore.translateY, 0);
    }
}

let touchEnd = function(e){
    state.touchEnd = true;
    if(!state.touchStart) return;
	var fastClick ;
	var currStore = state.currStore;
        //如果整个触摸过程时间小于fastClickTime，会认为此次操作是点击。但默认是屏蔽了容器的click事件的，所以提供一个clickCallback参数，会在点击操作时调用。
	if(fastClick = (e.timeStamp - state.startTime) < currStore.fastClickTime && !state.touchMove && typeof currStore.clickCallback === 'function'){
		currStore.clickCallback();
	}
	if(!state.touchMove) return;
        //如果移动距离没达到切换页的临界值，则让它恢复到最近的一次稳定状态
	if(fastClick || (Math.abs(state.diffX) < currStore.limitDisX && Math.abs(state.diffY) < currStore.limitDisY)){
        //在transitionend事件绑定的函数中判定是否重启轮播，但是如果transform前后两次的值一样时，不会触发transitionend事件，所以在这里判定是否重启轮播
        if(state.diffX === 0 && state.diffY === 0 && currStore.autoPlay) autoPlay(currStore);
	   //恢复到最近的一次稳定状态
            recover(currStore, currStore.translateX, currStore.translateY, 0);
	}else{
                //位移满足切换
		if(state.diffX > 0 || state.diffY > 0) {
                       //切换到上一个滑块
			moveTo(currStore, currStore.index - 1);
		}else{
                        //切换到下一个滑块
			moveTo(currStore, currStore.index + 1);
		}	
	}
}

let transitionDurationEndFn = function(){
    //将动画状态设置为false
    ic.store.animating = false;
    //执行自定义的iceEndCallBack函数
    if(typeof ic.store.iceEndCallBack === 'function')  ic.store.iceEndCallBack();
    //将动画时间归零
        transitionDuration(container, 0);
        //清空state
    if(ic.store.id === state.id) state = Object.create(null);
    //检测是否开启轮播
    if(ic.store.autoPlay) autoPlay(ic.store);
};

let autoPlay = function(store){
    store.autoPlayID = setTimeout(function(){
        //当前滑块的索引
        var index = store.index;
        ++index;
        //到最后一个了，重置为0
        if(index === store.childLength){
        index = 0;
        }
        //移动
        moveTo(store, index);
     },store.autoplayDelay);		
};
let zswiper = new Swiper();
