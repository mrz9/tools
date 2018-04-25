<template>
    <div class="page-list">
        <van-list
        v-model="loading"
        :finished="finished"
        class="good-list"
        @load="onLoad"
        >
          <van-cell-swipe :right-width="65" v-for="item in list" :key="item" :on-close="onClose">
            <van-cell-group>
              <van-cell>
                <div class="fx list-item">
                  <div class="fx fx-hc fx-mc fx-none img">
                    <img src="" alt="">
                  </div>
                  <div class="cont fx-auto fx fx-dc">
                    <p>title</p>
                    <div class="type-level">
                      <span>xxx > xxx</span>
                    </div>
                    <div class="span">
                      <span>¥100</span>
                      <del>¥100</del>
                    </div>
                  </div>
                </div>
              </van-cell>
            </van-cell-group>
            <span slot="right" class="action fx fx-dc fx-hc fc-vc del">
              <span>下架</span>
            </span>
          </van-cell-swipe>
        </van-list>

        <!-- filter -->
        <van-popup v-model="filter.popup" position="right" :overlay="true" @click-overlay="filterCancel">
            <div class="filter-wrap">
                <div class="flex-wrap">
                    <div class="flex-scroll">
                        <div class="filter-bar">
                            <van-search
                                v-model="filter.word"
                                placeholder="请输入搜索关键词"
                            />
                            <van-cell is-link value="点击修改" @click="zType.status=true">
                                <template slot="title">
                                    <span class="van-cell-text">分类：</span>
                                    <van-tag plain type="primary" >{{zType.label}}</van-tag>
                                </template>
                               
                            </van-cell>
                            <div class="cell-title">文章状态:</div>
                            <div class="label-tab-group">
                                <div @click="statusFilter" class="label-tab van-hairline" :class="{'on':filter.status.id == '1'}" data-id="1">发布</div>
                                <div @click="statusFilter" class="label-tab van-hairline" :class="{'on':filter.status.id == '0'}" data-id="0">未发布</div>
                                <div @click="statusFilter" class="label-tab van-hairline" :class="{'on':filter.status.id == '-1'}" data-id="-1">删除</div>
                                <div @click="statusFilter" class="label-tab van-hairline" :class="{'on':filter.status.id == ''}" data-id="">所有</div>
                            </div>
                        </div><!-- end flex-wrap -->
                        
                    </div><!-- end flex-scroll -->
                    <div class="flex-freeze">
                        <div class="btn-group">
                            <a href="javascript:;" @click="filterCancel">取消</a>
                            <a href="javascript:;">筛选</a>
                        </div>
                    </div><!-- end flex-freeze -->
                </div>
            </div>
        </van-popup>
        
        <!-- type picker -->
        <z-type :inject="zType" @itemclick="typeClick"/>
    </div>
</template>
<script>
import axios from "axios";
import zType from "@/admin/components/type.vue";
import {Dialog} from 'vant';
export default {
  name: "good_list",
  components: {
    [zType.name]: zType
  },
  data() {
    return {
      filter: {
        popup: false,
        word: "",
        status: {
          id: 1
        },
        type: {
          id: ""
        }
      },
      zType: {
        status: false,
        label: "所有分类"
      },
      list: [],
      loading: false,
      finished: false
    };
  },
  created() {
    this.$router.app.$on("toggleSearch", () => {
      this.filter.popup = !this.filter.popup;
    });
  },
  destroyed() {
    this.$router.app.$off("toggleSearch");
  },
  mounted() {
    axios
      .get("http://localhost:7001/admin/good/list/0/1")
      .then(response => {
        let { data } = response;
        if (data.status == 0) {
          console.log(data);
        } else {
          console.log(data.message);
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  methods: {
     onClose(clickPosition, instance) {
       console.log(clickPosition)
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            instance.close();
          });
          break;
      }
    },
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    typeClick(item) {
      this.zType.label = item.text;
      this.filter.type.id = item.id;
      this.zType.status = false;
    },
    statusFilter(e) {
      let id = e.currentTarget.dataset.id;
      this.filter.status.id = id;
    },
    filterCancel(e) {
      this.filter.popup = false;
    }
  }
};
</script>
<style lang="less" scoped>
.filter-wrap {
  height: 100%;
}
.btn-group {
  padding: 15px;
  font-size: 0;
  display: flex;
  box-sizing: border-box;
  a {
    &:last-child {
      color: #fff;
      background-color: #4caf50;
    }
    &:first-child {
      color: #4caf50;
    }
    & + a {
      margin-left: 15px;
    }
    box-sizing: border-box;
    display: block;
    height: 40px;
    line-height: 40px;
    flex: auto;
    text-align: center;
    border: 1px solid #4caf50;
    font-size: 16px;
    border-radius: 5px;
  }
}
.van-popup {
  &--right {
    width: 70%;
    height: 100%;
  }
}

.label-tab-group {
  margin-top: -10px;
  padding: 0 15px;
}
.label-tab {
  &::after {
    border-color: #4caf50;
    border-width: 1px;
  }
  &.on {
    background-color: #4caf50;
    color: #fff;
  }
  position: relative;
  border-radius: 5px;
  margin-top: 10px;
  padding: 5px 10px;
  line-height: normal;
  font-size: 14px;
  text-align: center;
  display: inline-block;
  color: #4caf50;
  background-color: #fff;
}

.good-list {
  .van-cell {
    padding-left:0;
    padding-right:0;
  }
}
.list-item {
  height:120px;
  
  .img {
    width:130px;
  }
  img {
    display: block;
    background-color:#ddd;
    width: 100%;
    height:auto;
  }
  .cont {
    margin-left:10px;
    text-align: left;

    p {
      margin:0 0 10px;
      display: -webkit-box;
      flex:auto;
      -webkit-box-orient: vertical;  
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}

.type-level {
  margin-bottom:10px;
  
  span {
    background-color:#4caf50;
    color:#fff;
    border-radius:4px;
    padding:0 6px;
  }
}
.span {
  font-size:14px;
  color:#999;
  span:first-child {
    color:red;
  }
}

.action {
  text-align: center;
  width:65px;
  height:100%;
  color:#fff;
}

.action.del {
  background-color:#f44;
}
.action.up {
  background-color:#4b0;
}
</style>
