<template>
  <div class="zswiper">
        <div class="zswiper-wrap">
            <div class="zswiper-item" style="background-color:red"></div>
            <div class="zswiper-item" style="background-color:blue"></div>
        </div>
        <div class="zswiper-page">
            <span>{{swiper.index + 1}}</span>/<span>{{swiper.length}}</span>
        </div>
    </div><!-- end swiper -->
</template>
<script>
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
export default {
    name:"z-swiper",
    data(){
        return {
            swiper:'',
            timeHandle:''
        }
    },
    mounted(){
        this.swiper = new Swiper();
       
    }
}
</script>
<style lang="less">
.zswiper {
    height:10rem;
    overflow: hidden;
    position:relative;
    .zswiper-wrap,.zswiper-item {
        height:100%;
        width:100%;
    }
    .zswiper-wrap {
       &::after {
           content:"";
           display:table;
           clear:both;
       }
        transform:translate3d(0,0,0);
        transition-property: transform;
        box-sizing: content-box
    }
    .zswiper-item {
        float:left;
    }
}
.zswiper-page {
    position: absolute;;
    bottom:.4rem;
    right: .4rem;
    width: .72rem;
    height: .37333rem;
    line-height: .37333rem;
    border: 1px solid rgba(0,0,0,.15);
    font-size: .26667rem;
    text-align: center;
    color: #333;
    background-color: #fff;
    transition: 0s;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
}
[data-dpr="1"] .zswiper-page {
    border-radius: 2px;
    line-height: .42667rem;
}
</style>


