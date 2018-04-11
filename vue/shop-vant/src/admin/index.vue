<template>
  <div id="app">
    
   
    <vue-drawer-layout
      ref="drawer"
      :animatable="true"
      :content-drawable="true"
      @mask-click="toggleDrawer"
      >
          <div class="drawer-content" slot="drawer">
            <div class="menu-header">
                <van-icon name="points" />
                <span>看不懂么</span>
            </div>
            <van-cell-group>
                <van-cell title="添加商品" @click="toggleDrawer" to="/good/add"/>
                <van-cell title="添加分类" @click="toggleDrawer" to="/type/add"/>
            </van-cell-group>
          </div><!-- drawer-content -->
          <div slot="content">
            <van-nav-bar title="傻逼管理后台">
                <van-icon name="wap-nav" slot="left" @click="toggleDrawer"/>
                <van-icon name="home" slot="right" @click="$router.push('/')"/>
            </van-nav-bar>
            <!-- 路由出口 -->
            <!-- 路由匹配到的组件将渲染在这里 -->
            <router-view></router-view>
          </div><!-- main-content -->
</vue-drawer-layout>
      
      
  </div>
</template>
<script>
import { DrawerLayout } from "vue-drawer-layout";

export default {
  components: {
    [DrawerLayout.name]: DrawerLayout
  },
  methods:{
      toggleDrawer(){
          this.$refs.drawer.toggle();
      }
  }
};
</script>

<style lang="less">
.menu-header {
    height:60px;
    background-color:#000313;
    font-size:24px;
    color:#fff;
    padding:10px 15px;
    line-height: 60px;
    i,span {
        vertical-align: middle;
    }
    .van-icon {
        // background:linear-gradient(98.7deg,rgba(255,229,186,1),rgba(97,77,40,1));
        // background-clip: text;         /* 规定背景的划分区域 */
        // -webkit-text-fill-color: transparent;
        color:rgba(255,229,186,1)
    }
}
</style>
