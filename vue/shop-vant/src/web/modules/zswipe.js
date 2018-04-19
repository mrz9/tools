let state = Object.create(null);
let isInit = false;

export default class ZSwiper {
    constructor(opt){
        if (!(this instanceof ZSwiper)) return new ZSwiper(opt);

        let self = this;
        this.support = {
            touch:(()=>!!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch))(),
            transforms3d : (function () {
                let div = document.createElement('div').style;
                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
            })(),
            transition : (function () {
                let div = document.createElement('div').style;
                return ('webkitTransition' in div || 'MozTransition' in div || 'OTransition' in div || 'MsTransition' in div || 'transition' in div);
            })()
        }

        if(!this.support.transition) return;

        this.container = document.querySelector(opt.el);
        if(!this.container) throw new Error('没有找到容器');
        this.wrap = this.container.querySelector(".zswiper-wrap");
        if(!this.wrap) throw new Error('没有找到.zswiper-wrap');
        let childLength = this.wrap.children.length;
        this.store = {	
            childLength: childLength,
            index: 0,
            translateX: 0,
            translateY: 0,
            direction: opt.direction === 'y' ? 'y' : 'x',
            animationDuration: 300,
            fastClickTime:  300,
            autoPlayID: null,
            autoPlay:true,
            autoplayDelay: 3000,
            animating:false
        };

        let touchStart = function(e){
            if (!self.support.touch && 'which' in e && e.which === 3) return;
            state.startX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            state.startY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            state.startTime = e.timeStamp;
            state.currentTarget = e.currentTarget;
            state.target = e.target;
            state.currStore = self.store;
            state.touchEnd = state.touchMove = false;
            state.touchStart = true;
            state.diffX = state.diffY = 0;
            state.animatingX = state.animatingY = 0;
        };

        let touchMove = function(e){
            if(e.target !== state.target || state.touchEnd || !state.touchStart) return;
            state.touchMove = true;
            var currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            var currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
            var currStore = state.currStore;
            if(currStore.animating){
                var animationTranslate = self.getTranslate(self.wrap);
                state.animatingX = animationTranslate.x - currStore.translateX;
                state.animatingY = animationTranslate.y - currStore.translateY;
                currStore.animating = false;
                self.removeTransitionDuration(self.wrap);
            }
            if(currStore.autoPlayID !== null){
                clearTimeout(currStore.autoPlayID);
                currStore.autoPlayID = null;
            }
            if(currStore.direction === 'x'){
                state.diffX = Math.round((currentX - state.startX) );
                self.translate(self.wrap, state.animatingX + state.diffX + state.currStore.translateX, 0, 0);
            }else{
                state.diffY = Math.round((currentY - state.startY));
                self.translate(self.wrap, 0, state.animatingY + state.diffY + state.currStore.translateY, 0);
            }
        }

        let touchEnd = function(e){
            state.touchEnd = true;
            if(!state.touchStart) return;
            var fastClick ;
            var currStore = state.currStore;
            fastClick = (e.timeStamp - state.startTime) < currStore.fastClickTime;
            if(!state.touchMove) return;
            if(fastClick || (Math.abs(state.diffX) < currStore.limitDisX && Math.abs(state.diffY) < currStore.limitDisY)){
               if(state.diffX === 0 && state.diffY === 0 && currStore.autoPlay) self.autoPlay(currStore);
               self.recover(currStore, currStore.translateX, currStore.translateY, 0);
            }else{
                if(state.diffX > 0 || state.diffY > 0) {
                    self.moveTo(currStore, currStore.index - 1);
                }else{
                    self.moveTo(currStore, currStore.index + 1);
                }	
            }
        }

        let transitionDurationEndFn = ()=>{
            self.store.animating = false;
            self.transitionDuration(self.wrap, 0);
            state = Object.create(null);
            if(self.store.autoPlay) self.autoPlay(self.store)
        }
    
        let initEvent = ()=>{
            this.update();
            window.addEventListener('resize',()=>{this.update()},false);
            var events = this.support.touch ? ['touchstart', 'touchmove', 'touchend']:['mousedown','mousemove','mouseup'];
            var transitionEndEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
            for (var i = 0; i < transitionEndEvents.length; i++) {
                this.addEvent(this.wrap, transitionEndEvents[i], transitionDurationEndFn, false);
            } 
           
            this.addEvent(this.container, events[0], touchStart, false);
            if(!isInit){
                this.addEvent(document, events[1], touchMove, false);
                this.addEvent(document, events[2], touchEnd, false);
                isInit = true;
            }
        }

        initEvent();
        if(this.store.autoPlay) this.autoPlay(this.store);
    }
    update(){
        console.log('update')
        let rect = this.container.getBoundingClientRect();
        this.wrap.style.width = this.store.childLength * rect.width + 'px';
        for(let i =0;i< this.store.childLength;i++){
            this.wrap.children[i].style.width = rect.width + 'px'
        }

        this.store.width =  rect.width
        this.store.height =  rect.height
        this.store.limitDisX =   0.3 * rect.width
        this.store.limitDisY =   0.3 * rect.height
    }
    addEvent(target, type, fn, capture = false){
        target.addEventListener(type, fn, capture);
    }
    moveToIndex(index){
		var currStore = this.store;
		if(currStore.index === index) return;
		if(currStore.autoPlayID){
        	clearTimeout(currStore.autoPlayID);
        	currStore.autoPlayID = null;
        }
		this.moveTo(currStore, index);
    }
    getIndex(){
		return this.store.index;
    }
    moveTo(store, index){
        let currStore = store;
        if(index < currStore.childLength && index > -1){
            this.setIndex(currStore, index);
            if(currStore.direction === 'x'){	
                this.recover(currStore, -index * currStore.width, 0, 0);
                currStore.translateX = -index * currStore.width;
            }else{
                this.recover(currStore, 0 , -index * currStore.height, 0);
                currStore.translateY = -index * currStore.height;
            }
        }else {
            this.recover(currStore, currStore.translateX , currStore.translateY, 0);
        }
    }
    setIndex(store, index){
        store.index = index;
    }

    recover(store, x, y, z){
        store.animating = true;
        this.transitionDuration(this.wrap, store.animationDuration);
        this.translate(this.wrap, x, y, z);
    }
    translate(ele, x, y, z){
        if (this.support.transforms3d){
            this.transform(ele, 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
        } else {
            this.transform(ele, 'translate(' + x + 'px, ' + y + 'px)');
        }
    }

    transform(ele, transform){
        let elStyle = ele.style;
        elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
    }

    transitionDuration(ele,time){
        let elStyle = ele.style;
        elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = time + 'ms';
    }

    removeTransitionDuration(ele){
        let elStyle = ele.style;
        elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = '';
    }

    getTranslate(el){
        let curStyle = window.getComputedStyle(el);
        let curTransform = curStyle.transform || curStyle.webkitTransform;
        let x,y; x = y = 0;
        curTransform = curTransform.split(', ');
        if (curTransform.length === 6) {
            x = parseInt(curTransform[4], 10);
            y = parseInt(curTransform[5], 10);
        }
        return {'x': x,'y': y};
    }

    autoPlay(store){
        store.autoPlayID = setTimeout(()=>{
            let index = store.index;
            ++index;
            if(index === store.childLength){
                index = 0;
            }
            this.moveTo(store, index);
        },store.autoplayDelay);
    };
}



// window.zswiper = new ZSwiper({el:'.zswiper'});
// console.log(zswiper);