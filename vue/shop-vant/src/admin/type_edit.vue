
<template>
  <div class="page-tyoe-edit">
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
          text: "顶级分类",
          id: 0
        },
        {
          text: "分类1",
          id: 1
        }
      ]
    };
  },
  computed: {
    formStatus() {
      return !String(this.form.name).trim();
    }
  },
  methods: {
    onCancel(item) {
      this.popupShow = false;
    },
    onConfirm(item) {
      this.form.pid = item.id;
      this.typeLabel = item.text;
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
            Toast.success("成功文案");
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
.page-tyoe-edit {
  .bottom-btn {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
