<template>
  <div id="detail">
      <div class="row">
        <z-swiper />
        <div class="content">
            <div class="info">
                <div class="name">女式抽绳长袖条纹 T恤</div>
                <div class="price">
                    <span class="current">
                        <span>¥</span><span>169</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="aritcle">
            <div class="tt">商品描述</div>
            <div class="ct">
                💕💕💕8073花鞋短袖T恤（原创专柜）
        实体店批发最少70-80以上！
        粉色、白色、紫色
       M-XL码，价格：79
👉原创定制，款式新颖别致，不会撞衫！超有春天的气息感～重工艺定制！这些T恤在实体都非常贵！我们全部出厂价！
👉超赞的做工！线头都找不到一根！内里全部包边，前面图案手工定制！配饰都是定做的噢
👉休闲韩版，M胸96104长62，M适合88～105，胖瘦不挑人
            </div>
        </div>
    </div><!-- END row -->
    <div class="bottom-bar-wrap"></div>
    <div class="bottom-bar">
        <a href="" class="btn buy">购买</a>
        <a href="" class="btn fav">收藏</a>
    </div><!--end bottom-bar -->
  </div><!-- end detail -->
</template>

<script>
import Vue from 'vue';
import VueQArt from 'vue-qart';
import zSwiper from '@/web/components/swiper.vue';

export default {
    components:{
        [zSwiper.name]:zSwiper
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
    mounted(){
        console.log(12);
        
    },
    methods:{
        preview(index){
            ImagePreview(this.images,index)
        }
    }
}
</script>

<style lang="less" scoped>
.row {
    width:10rem;
    margin-left:auto;
    margin-right:auto;
}

.content {
    padding: .53333rem .53333rem .4rem;
    border-bottom: .26667rem solid #f4f4f4;
    display: flex;
    background-color:#fff;
    box-sizing: border-box;
    .name {
        font-size: .48rem;
        margin-bottom: .06667rem;
    }

    .price {
        height: .74667rem;
        margin-bottom: .10667rem;
        .current {
                font-size: .64rem;
                color: #B4282D;
                font-weight: 700;
        }
    }
}
.aritcle {
    padding:.4rem;
    background-color:#fff;

    .tt {
        padding: 0 0 .4rem;
        font-size: .37333rem;
        line-height: 1;
        background-position:bottom;
        background-size:12px 1px;
        background-image:linear-gradient(to right,#919191 33%,rgba(255,255,255,0) 0);
        background-repeat: repeat-x;
    }
    .ct {
        padding:.4rem 0;
        line-height:.48rem;
    }
}
.bottom-bar-wrap  {
    height:1.38667rem;
    border-bottom:.26667rem solid #f4f4f4;
}
.bottom-bar {
    position:fixed;
    width:100%;
    bottom:0;
    left:0;
    background-color:#fff;
    height:1.38667rem;
    
    &, .btn {
        display:flex;
        justify-content: center;
        align-content: center
    }
    .btn {
        width:50%;
        box-sizing: border-box;
        flex-shrink: 0;
        flex-grow: 0;
        font-size:.37333rem;
        border-top:1px solid;
        flex-direction: column;
        text-align: center;
        height: 100%;
    }
    .fav {
        border-color:#b4282d;
        background-color: #b4282d;
        color:#fff;
    }
    .buy {
        background-color:#fff;
        color:#333;
        border-color:#c7c7c7;
    }
}
</style>
