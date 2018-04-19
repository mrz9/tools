<template>
  <div class="zswiper">
        <div class="zswiper-wrap">
            <div class="zswiper-item" style="background-color:red"></div>
            <div class="zswiper-item" style="background-color:blue"></div>
        </div>
        <div class="zswiper-page" v-if="swiper.store">
            <span>{{swiper.store.index + 1}}</span>/<span>{{swiper.store.childLength}}</span>
        </div>
    </div><!-- end swiper -->
</template>
<script>
import ZSwiper from '../modules/zswipe';
export default {
    name:"z-swiper",
    data(){
        return {
            swiper:'',
            timeHandle:''
        }
    },
    mounted(){
        this.swiper = new ZSwiper({el:".zswiper"});
       console.log(this.swiper.store.index,this.swiper.store.childLength)
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


