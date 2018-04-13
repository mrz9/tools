<template>
  <div class="page-good-edit">
      <div class="cell-title">标题：</div>
      <van-field type="textarea" :autosize="{maxHeight: 100}" v-model="form.title" placeholder="输入商品标题" />

      <div class="cell-title">现价：</div>
      <van-field type="number" v-model="form.n_price" placeholder="现在购买价格" />
      
      <div class="cell-title">原价：</div>
      <van-field type="number" v-model="form.o_price" placeholder="原价（不填则页面不显示原价）" />
      
      <div class="cell-title">详情：</div>
      <van-field type="textarea" :autosize="true" v-model="form.content" placeholder="输入商品描述" />
    
      <div class="cell-title">规格类型：</div>
      <van-cell>
        <div>
          <a href="javascript:;" class="btn-outline btn-primary">添加</a>
        </div>
      </van-cell>

    <div class="cell-title">效果图：</div>
    <van-cell-group class="upload-wrap">
      <div class="flex-item">
        <van-uploader class="add-img" :after-read="imgRead">
          <van-icon name="photograph" />
        </van-uploader>
      </div>
      <div class="flex-item" v-for="(img,index) in form.thumbs" :key="index">
        <div class="img" :style="{'background-image':'url('+img+')'}" ></div>
      </div>
    </van-cell-group>

      <div class="filed-wrap ">
        <van-button class="submit" type="primary" :disabled="formStatus" :loading="posting" block @click="submit">提交</van-button>
      </div>
  </div>
</template>
<script>
export default {
  name: "good_edit",
  data() {
    return {
      posting: false,
      form: {
        title: "",
        n_price: "", //现价
        o_price: "", //原价 非必填
        content: "",
        thumbs: []
      }
    };
  },
  computed: {
    formStatus() {
      // title: "",
      //   n_price: "", //现价
      //   o_price: "", //原价 非必填
      //   content: "",
      //   thumbs: []

        // if(!this.form.title.trim() ||
        //     this.form.n_price &&isNaN(this.form.n_price) 
        //   )

      return !String(this.form.name).trim();
    }
  },
  methods: {
    imgRead(rs) {
      this.form.thumbs.push(rs.content);
    },
    reset(){
      this.posting = false;
      this.form = {
        title: "",
        n_price: "", //现价
        o_price: "", //原价 非必填
        content: "",
        thumbs: []
      }
    },
    submit() {
      this.posting = true;
      axios
        .post("/admin/good/create", this.form)
        .then(response => {
          let { data } = response;
          if (data.status == 0) {
            Toast.success("创建成功");
            this.reset();
          } else {
            Toast.fail(data.message);
          }
          this.posting = false;
        })
        .catch(error => {
          Toast.fail("请求错误");
          this.posting = false;
        });
    }
  }
};
</script>

<style lang="less">
body {
  background-color: #efefef;
}
// .page-good-edit {
  .cell-title {
    padding: 10px 15px;
    font-size: 14px;
    color: rgba(69, 90, 100, 0.6);
  }

  .upload-wrap {
    padding: 15px;
    padding-top: 5px;
    font-size: 0;
  }

  .flex-item {
    margin-top: 10px;
    display: inline-block;
    width: 33.3333%;
    text-align: center;
    vertical-align: middle;
  }
  .add-img,
  .img {
    display: inline-block;
    width: 100px;
    height: 100px;
  }
  .img {
    background-color: #d7d7d7;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .add-img {
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #d7d7d7;

    i {
      line-height: 100px;
      color: #d7d7d7;
      font-size: 46px;
    }
  }
// }
</style>


