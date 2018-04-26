
<template>
  <div class="page-type-edit">
      <div class="cell-title">分类名称：</div>
      <van-field  v-model="form.name" placeholder="选择分类名称" />

      <div class="cell-title">父级分类：<small>（若不选择，默认为顶级分类）</small></div>
      <van-cell is-link value="点击修改" @click="popupShow=true">
        <template slot="title">
          <span class="van-cell-text">当前分类</span>
          <van-tag plain type="primary">{{typeLabel}}</van-tag>
        </template>
      </van-cell>
      
      <van-popup v-model="popupShow" position="bottom">
        <van-picker
          show-toolbar
          title="选择"
          value-key="name"
          :columns="typeData"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
      </van-popup>
      <div class="filed-wrap bottom-btn">
        <van-button class="submit" type="primary" :disabled="formStatus" :loading="posting" block @click="submit">提交</van-button>
      </div>
  </div>
</template>
<script>
import axios from "axios";
import { Toast } from "vant";

export default {
  name: "type_edit",
  data() {
    return {
      posting: false,
      popupShow: false,
      typeLabel: "顶级分类",
      form: {
        name: "",
        pid: 0
      },
      typeData: [
        {
          name: "顶级分类",
          id: 0
        }
      ]
    };
  },
  computed: {
    formStatus() {
      return !String(this.form.name).trim();
    }
  },
  mounted(){
    this.loadType();
  },
  methods: {
    loadType(){
      Toast.loading({
        type:'loading',
        mask:true,
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '正在获取分类信息'
      });
        axios.get("/admin/type/getTypes")
          .then(response=>{
            let { data } = response;
            if (data.status == 0) {
              this.typeData = this.typeData.concat(data.data.filter(item=>item.pid==0));
              Toast.clear();
            } else {
              Toast.fail(data.message);
            }
          })
          .catch(e=>{
              Toast({
                type:'text',
                message:"获取分类失败，请刷新页面"
              });
          });
    },
    onCancel(item) {
      this.popupShow = false;
    },
    onConfirm(item) {
      this.form.pid = item.id;
      this.typeLabel = item.name;
      this.popupShow = false;
    },
    reset() {
      this.form.name = "";
      this.form.pid = 0;
      this.typeLabel = "顶级分类";
    },
    submit() {
      this.posting = true;
      axios
        .post("/admin/type/create", this.form)
        .then(response => {
          let { data } = response;
          if (data.status == 0) {
            Toast.success("添加成功");
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
.page-type-edit {
  .bottom-btn {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
