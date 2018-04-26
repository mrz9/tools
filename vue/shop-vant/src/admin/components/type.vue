<template>
    <van-popup v-model="inject.status" position="bottom">
        <van-tree-select
            :items="inject.items"
            :main-active-index="mainActive"
            :active-id="activeId"
            @navclick="navSelect"
            @itemclick="itemClick"
        />
    </van-popup>
</template>
<script>
import axios from "axios";
import { Toast } from "vant";

export default {
  name: "z-type",
  props: {
    inject: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      items: [],
      mainActive: 0,
      activeId: -1
    };
  },
  mounted() {
    // Toast.loading({
    //   type: "loading",
    //   mask: true,
    //   duration: 0, // 持续展示 toast
    //   forbidClick: true, // 禁用背景点击
    //   message: "获取分类信息"
    // });
    // axios
    //   .get("http://localhost:7001/admin/type/getTypes")
    //   .then(response => {
    //     let { data } = response;
    //     if (data.status == 0) {
    //       let types = [],
    //         tmap = {};

    //       data.data.forEach(item => {
    //         if (item.pid == 0) {
    //           if (!tmap[item.id]) tmap[item.id] = {};
    //           tmap[item.id].text = item.name;
    //           tmap[item.id].children = [];
    //         } else {
    //           if (!tmap[item.pid]) {
    //             tmap[item.pid] = {};
    //             tmap[item.pid].children = [];
    //           }
    //         tmap[item.pid].children.push({
    //             id: item.id,
    //             text: item.name,
    //             pid: item.pid
    //         });
              
    //         }
    //       });

    //       Object.keys(tmap).forEach(k => {
    //         types.push(tmap[k]);
    //       });

    //       this.items = types;
    //       this.navSelect(0);
    //       Toast.clear();
    //     } else {
    //       Toast.fail(data.message);
    //     }
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     Toast({
    //       type: "text",
    //       message: "获取分类失败，请刷新页面"
    //     });
    //   });
  },
  methods: {
    navSelect(id) {
      this.mainActive = id;
    //   this.activeId = this.items[id].children[0].id;
      this.$emit("navclick", id);
    },
    itemClick(item) {
      this.activeId = item.id;
      this.$emit("itemclick", item);
      this.cancel();
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>
