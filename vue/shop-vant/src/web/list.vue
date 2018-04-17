<template>
    <div id="page">
        <van-nav-bar title="test" class="scroll-header">
            <van-icon name="home" slot="left" />
            <van-icon name="search" slot="right" />
        </van-nav-bar>
        <div class="good-list">
            <a class="good-item" v-for="(img,index) in 30" :key="index">
                <img src="" alt="">
                <div class="tit">测试{{img}}</div>
                <div class="price">
                    <span>¥</span>
                    <span>108</span>
                </div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
  name:"list",
  data(){
      return {
        list: [],
        loading: false,
        finished: false
      }
  }
}
</script>
<style lang="less" scoped>
    .good-list {
        margin-top:46px;
        &::after {
            content:' ';
            display: table;
            clear: both;
        }
        padding:.14rem .07rem 0;
        box-sizing: border-box;
        background-color:#fff;
    }
    .good-item {
        display: block;
        float: left;
        width:50%;
        padding:0 .07rem .14rem;
        box-sizing: border-box;
        img {
            display: block;
        }
        img {
            width:100%;
            height:3.54rem;
            background-color:#eee;
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
            font-size: .3rem;
            text-align: left;
            color: #b4282d;
            padding: 0 .13333rem;
        }
    }
</style>


