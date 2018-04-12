<template>
  <div class="page-good-edit">
      <div class="cell-title">分类名称：</div>
      <van-field  v-model="form.name" placeholder="选择分类名称" />

      <div class="cell-title">父级分类：<small>（若不选择，默认为顶级分类）</small></div>
      <van-cell is-link value="修改" @click="popupShow=true">
        <template slot="title">
          <span class="van-cell-text">当前分类</span>
          <van-tag plain type="primary">{{typeLabel}}</van-tag>
        </template>
      </van-cell>
      
      <van-popup v-model="popupShow" position="bottom" >
        <van-picker
          show-toolbar
          title="选择"
          :columns="typeData"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
      </van-popup>

      <van-button class="mt10 submit" type="primary" :disabled="formStatus" :loading="posting" bottom-action @click="submit">提交</van-button>
  </div>
</template>
<script>
export default {
  data(){
    return {
      posting:false,
      popupShow:false,
      typeLabel:'顶级分类',
      form:{
        name:'',
        pid:0
      },
      typeData:[
        {
          text:"顶级分类",
          id:0
        },
        {
          text:"分类1",
          id:1
        },
      ]
    }
  },
  computed:{
    formStatus(){
      return !String(this.form.name).trim()
    }
  },
  methods:{
    onCancel(item){
      this.popupShow = false
    },
    onConfirm(item){
      this.form.pid = item.id;
      this.typeLabel = item.text;
      this.popupShow = false
    },
    submit(){
      this.posting = true;
    }
  }
}
</script>


