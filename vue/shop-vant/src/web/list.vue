<template>
    <div id="page">
        <div class="scroll-header">
            <div class="ui-header border">
                <a href="">a</a>
                <span>小Z优选</span>
                <a href="">s</a>
            </div>
           <div class="nav-list border">
               <div class="tab">
                   <span class="txt active">上衣</span>
                   <span class="txt">长裤</span>
               </div>
           </div>
        </div>
        <div class="fixed-wrap"></div>
        <div class="good-list">
            <a class="good-item" v-for="item in list" :key="item.id">
                <div class="img-wrap" :style="{'background-image':'url(http://localhost:7001' + item.image+')'}">
                </div>
                <div class="tit">{{item.id}}{{item.title}}</div>
                <div class="price">
                    <span>¥</span><span>{{item.price}}</span>
                </div>
            </a>
        </div>
        <div class="loading-tip">点击加载更多</div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  name:"list",
  data(){
      return {
        list: [],
        page:1,
        loading: false,
        finished: false
      }
  },
  mounted(){
      this.load();

      window.onresize = resizeFixed;
      resizeFixed();
      function resizeFixed(){
          let fw = document.querySelector('.fixed-wrap');
          fw.setAttribute('style',`height:${window.lib.flexible.rem2px(1.96)}px`);
      }
  },
  methods:{
      load(){
          if(this.loading || this.finished) return false;
          this.loading = true;
          axios.get(`http://localhost:7001/admin/good/list/0/${this.page}`)
                .then(response=>{
                    let {data} = response;
                    if(data.status == 0){
                        if(data.data.length > 0){
                            this.list = this.list.concat(data.data);
                            this.page ++;
                        }else{
                            this.finished = true;
                        }
                        this.loading = false;
                    }
                    console.log(data);
                }).catch(e=>{
                    console.error(e);
                    this.loading = false;
                })
      }
  }
}
</script>
<style lang="less" scoped>
.borderLine() {
    content:'';
    position: absolute;
    background-color: #d9d9d9;
    width: 100%;
    height: 1px;
    -webkit-transform-origin: 50% 100% 0;
    transform-origin: 50% 100% 0;
}
.scroll-header {
    position:fixed;
    width: 100%;
    top:0;
    left:0;
    background-color:#fff;
    box-shadow: 0 1px 3px 0px #d9d9d9
}
.border,.loading-tip {
    position: relative;
    &::after{
        .borderLine();
        bottom:0;
    }
}
.ui-header {
    display: flex;
    justify-content:space-between;
    align-items: center;
    height:1.16rem;
    
    span {
        font-size:.37333;
    }
    a {
    }
}
.nav-list {
    padding:0 .4rem;
    background-color:#fff;
    .txt {
        &.active {
            position: relative;
            color: #b4282d;

            &::after {
                content: ' ';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: .05333rem;
                background-color: #b4282d;
            }
        }
        
        display: inline-block;
        padding: 0 .21333rem;
        line-height: .8rem;
        font-size: .37333rem;
        color: #333;
        text-align: center;
    }
}

.good-list {
    margin-top:.26667rem;
    padding-top:.44rem;
    &::after {
        content:' ';
        display: table;
        clear: both;
    }
    box-sizing: border-box;
    background-color:#fff;
}
.good-item {
    display: block;
    float: left;
    width:50%;
    box-sizing: border-box;
    &:nth-of-type(odd){
        padding:0rem 0.13333333333333333rem 0.44rem 0.26666666666666666rem
    }
    &:nth-of-type(even){
        padding:0rem 0.26666666666666666rem 0.44rem 0.13333333333333333rem
    }
    .img-wrap {
        background-size:cover;
        background-position: center;
        background-repeat: no-repeat;
        height:4.5rem;
        background-color:#f4f4f4;
        overflow: hidden;
    }
    .tit {
        margin-top: .13333rem;
        padding: 0 .13333rem;
        line-height: .64rem;
        text-align: left;
        font-size: .37333rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #333;
    }
    .price {
        line-height: 1;
        font-size: .42667rem;
        text-align: left;
        color: #b4282d;
        padding: 0 .13333rem;
    }
}

.loading-tip  {
    &::before{
        .borderLine();
        top:0;
    }
    margin-top:.26667rem;
    line-height: .8rem;
    text-align: center;
    background-color:#fff;
    text-align: center;
    font-size:.32rem;
}
</style>


