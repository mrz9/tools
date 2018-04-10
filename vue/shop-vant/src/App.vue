<template>
  <div id="app">
    <van-cell-group class="item-list">
      <van-cell is-link icon="points" title="我的积分" />
      <van-cell is-link icon="gift" title="我收到的礼物" />
    </van-cell-group>
    <div class="van-ellipsis" style="width:100px;">测试超出裁剪测试超出裁剪测试超出裁剪测试超出裁剪测试超出裁剪测试超出裁剪测试超出裁剪测试超出裁剪</div>
    <van-badge-group :active-key="activeKey">
      <van-badge title="标签名称" @click="onClick" />
      <van-badge title="标签名称" @click="onClick" info="8" />
      <van-badge title="标签名称" @click="onClick" info="99" />
      <van-badge title="标签名称" @click="onClick" info="199" />
    </van-badge-group>
  </div>
</template>

<script>
import { Cell, CellGroup, Icon, Badge, BadgeGroup } from 'vant';


export default {
  data(){
    return {
      activeKey:2,
    }
  },
  methods:{
     onClick(key) {
      this.activeKey = key;
    }
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Badge.name]: Badge,
    [BadgeGroup.name]: BadgeGroup
  }
};
</script>

<style>
body {
  background-color: #f8f8f8;
}

.van-cell__title .van-icon {
  font-size: 18px;
}
</style>
