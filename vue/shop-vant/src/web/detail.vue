<template>
  <div id="app">
    <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" @click="preview(index)"/>
        </van-swipe-item>
    </van-swipe>
   
   <div class="title-info">
       <p>{{goods.title}}</p>
       <p class="info">
           <span class="new">¥ 99</span>
           <del class="old">¥ 199</del>
       </p>
   </div>

    <van-tabs>
        <van-tab v-for="tab in tabs" :title="tab.name" :key="tab.name">
            <template slot="title">
                <span class="van-ellipsis text-left ">{{tab.name}}</span>
            </template>
            {{ tab.value }}
        </van-tab>
    </van-tabs>

    <van-goods-action>
        <van-goods-action-mini-btn icon="chat" text="客服" />
        <van-goods-action-mini-btn icon="cart" text="购物车" info="5" />
        <van-goods-action-big-btn text="收藏" />
        <van-goods-action-big-btn text="查看规格" primary @click="sku.status = true" />
    </van-goods-action>

    <van-sku
        v-model="sku.status"
        :sku="sku"
        :goods="goods"
        :reset-selected-sku-on-hide="true"
        :close-on-click-overlay="true"
        :hide-stock="true"
    >
        <template slot="sku-stepper">
            <span></span>
        </template>
        <!-- 自定义 sku actions -->
        <template slot="sku-actions" slot-scope="props">
            <div class="van-sku-actions">
                <van-button type="primary" bottom-action @click="qrShow = true">购买</van-button>
            </div>
        </template>
    </van-sku>

    <van-popup v-model="qrShow">
        <vue-q-art :config="qr"></vue-q-art>
    </van-popup>
  </div><!-- end instance -->
</template>

<script>
import Vue from 'vue';
import VueQArt from 'vue-qart';
import {
    Swipe, 
    SwipeItem,
    ImagePreview,
    Lazyload, 
    Tab, 
    Tabs,
    Sku,
    Button,
    GoodsAction,
    GoodsActionBigBtn,
    Popup,
    GoodsActionMiniBtn
    } from 'vant';

Vue.use(Lazyload);

export default {
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Sku.name]: Sku,
        [GoodsAction.name]: GoodsAction,
        [GoodsActionBigBtn.name]: GoodsActionBigBtn,
        [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
        [Button.name]: Button,
        [Popup.name]: Popup,
        'vue-q-art': VueQArt
    },
    data() {
        return {
            qrShow:false,
            qr:{
                value:'https://u.wechat.com/MBCbd8go-JnHBJMqUTPbxnQ',
                imagePath: '/static/imgs/logo.png',
                filter: 'color'
            },
            goods: {
                // 商品标题
                title: '这是一个标题，很长很长的标题这是一个标题，很长很长的标题这是一个标题，很长很长的标题',
                // 默认商品 sku 缩略图
                picture: 'https://img.yzcdn.cn/2.jpg'
            },
            images: [
                'https://img.yzcdn.cn/1.jpg',
                '/static/imgs/logo.png'
            ],
            tabs:[
                {
                    active:true,
                    name:'详情',
                    value:'这是床说中的详情'
                },
                
            ],
            sku:{
                status:false,
                 tree: [
                    {
                        k: '颜色', // skuKeyName：规格类目名称
                        v: [
                            {
                                id: '30349', // skuValueId：规格值 id
                                name: '红色', // skuValueName：规格值名称
                                imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
                            },
                            {
                                id: '1215',
                                name: '蓝色',
                                imgUrl: 'https://img.yzcdn.cn/2.jpg'
                            }
                        ],
                        k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    },
                    {
                        k: '尺寸', // skuKeyName：规格类目名称
                        v: [
                            {
                                id: '1',
                                name: 'M码'
                            },
                            {
                                id: '2',
                                name: 'S码'
                            }
                        ],
                        k_s: 's2' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    }
                ],
                list: [
                    {
                        id: 2259, // skuId，下单时后端需要
                        price: 100, // 价格（单位分）
                        s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
                        stock_num:100,
                    },
                    {
                        id: 2259, // skuId，下单时后端需要
                        price: 100, // 价格（单位分）
                        s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
                        stock_num:100,
                    },
                    {
                        id: 2259, // skuId，下单时后端需要
                        price: 100, // 价格（单位分）
                        s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
                        stock_num:100,
                    },
                    {
                        id: 2259, // skuId，下单时后端需要
                        price: 100, // 价格（单位分）
                        s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                        s2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
                        stock_num:100,
                    }
                ],
                price: '1.00', // 默认价格（单位元）
            }
        }
    },
    methods:{
        preview(index){
            ImagePreview(this.images,index)
        }
    }
}
</script>

<style lang="less">
body {
  background-color: #f8f8f8;
}
.van-tab__pane,.title-info {
    padding:10px 5px;
    background-color:#fff;
}
.title-info {
    margin-bottom:10px;
    p {
        margin:0;
    }
    .info {
        margin-top:10px
    }
    span + del {
        padding-left:5px;
    }
    span {
        font-size:14px;
        color:chocolate
    }
    del {
        font-size:10px;
    }
}
.van-cell__title .van-icon {
  font-size: 18px;
}
.text-left {
    text-align: left;
}

</style>
