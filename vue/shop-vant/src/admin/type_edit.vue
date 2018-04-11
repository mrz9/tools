<template>
  <div class="page-type-edit">
      <div class="cell-title">标题：</div>
      <van-field type="textarea" :autosize="{maxHeight: 100}" v-model="form.title" placeholder="输入商品标题" />

      <div class="cell-title">现价：</div>
      <van-field type="number" v-model="form.n_price" placeholder="现在购买价格" />
      
      <div class="cell-title">原价：</div>
      <van-field type="number" v-model="form.o_price" placeholder="原价（不填则页面不显示原价）" />
      
      <div class="cell-title">详情：</div>
      <van-field type="textarea" :autosize="true" v-model="form.content" placeholder="输入商品描述" />
    
    <div class="cell-title">效果图：</div>
    <van-cell-group class="upload-wrap">
      <div class="img" v-for="(img,index) in form.thumbs" :style="{'background-image':'url('+img+')'}" :key="index"></div>
      <van-uploader class="add-img" :after-read="imgRead">
        <van-icon name="photograph" />
      </van-uploader>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data(){
    return {
      form:{
        title:'',
        n_price:'',//现价
        o_price:'',//原价 非必填
        content:'',
        thumbs:[]
      }
    }
  },
  methods:{
    imgRead(rs){
      this.form.thumbs.push(rs.content);
    }
  }
}
</script>

<style lang="less">
body {
  background-color:#efefef;
}
.cell-title {
  padding:10px 15px;
  font-size:14px;
  color:rgba(69,90,100,.6)
}

.upload-wrap {
  padding:15px;
  padding-top:5px;
  margin-left:-10px;
  font-size:0;
}

.add-img,.img {
  display:inline-block;
  margin-left:10px;
  margin-top:10px;
  width:100px;
  height: 100px;
  vertical-align: middle;
}
.img {
  background-size:contain;
  background-repeat: no-repeat;
  background-position: center;
}
.add-img {
  text-align: center;
  box-sizing: border-box;
  border:1px solid #d7d7d7;

  i {
    line-height: 100px;
    color:#d7d7d7;
    font-size:46px;
  }
}
</style>
