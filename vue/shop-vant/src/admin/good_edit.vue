<template>
  <div class="page-good-edit">
      <div class="cell-title">标题：</div>
      <van-field type="textarea" :autosize="{maxHeight: 100}" v-model="form.title" placeholder="输入商品标题" />

      <div class="cell-title">现价：</div>
      <van-field type="number" v-model="form.n_price" placeholder="现在购买价格" />
      
      <div class="cell-title">原价：</div>
      <van-field type="number" v-model="form.o_price" placeholder="原价（不填则页面不显示原价）" />
      <div class="cell-title">商品分类：</div>
      <van-cell is-link value="点击修改" @click="typeSelect.status=true">
        <template slot="title">
          <span class="van-cell-text">当前分类</span>
          <van-tag plain type="primary" v-show="typeSelect.label">{{typeSelect.label}}</van-tag>
        </template>
      </van-cell>
      <div class="cell-title">规格类型：</div>
      <div class="type-group">

          <div class="type-wrap van-contact-card" v-for="(item,index) in form.tree" :key="index">
              <van-field type="text" placeholder="分类名字" v-model="item.name" :error="!item.name">
                 <van-button slot="button" size="mini" type="danger" @click="deleteTree(index)">删除</van-button>
              </van-field>
              <van-cell  class="sub-list">
                <van-tag type="primary" v-for="(tag,idx) in item.list" :key="idx" @click="item.list.splice(idx,1)">{{tag}}</van-tag>
              </van-cell>
              <van-field
                v-show="item.name"
                type="text"
                v-model.trim="item.tag"
                :placeholder="'请输入' + item.name + '规格'"
                :disabled="!item.name"
                @click-icon="!!item.tag && item.list.push(item.tag),item.tag = ''"
              >
                <div slot="icon">
                  <van-icon name="add-o" class="text-primary"/>
                </div>
              </van-field>
          </div>
  
          <van-cell>
            <a href="javascript:;" class="btn-outline btn-primary" @click="treeAdd">添加</a>
          </van-cell>
      </div>

    <div class="cell-title">轮播图：</div>
    <van-cell-group class="upload-wrap">
      <div class="flex-item">
        <van-uploader class="add-img" :after-read="imgRead">
          <van-icon name="photograph" />
        </van-uploader>
      </div>
      <div class="flex-item" v-for="(img,index) in form.thumbs" :key="index">
        <div class="img" :style="{'background-image':'url('+(!img.startsWith('data:image') ? baseUrl +  img : img )+')'}" @click="preview(form.thumbs,index)"></div>
        <van-icon name="clear" class="btn-close" @click="form.thumbs.splice(index,1)"/>
      </div>
    </van-cell-group>

     <div class="cell-title">内容详情图片：</div>
      <van-cell-group class="upload-wrap">
        <div class="flex-item">
          <van-uploader class="add-img" :after-read="contentImgRead">
            <van-icon name="photograph" />
          </van-uploader>
        </div>
        <div class="flex-item" v-for="(img,index) in form.content_thumbs" :key="index">
          <div class="img" :style="{'background-image':'url('+ (!img.startsWith('data:image') ? baseUrl +  img : img )+')'}" @click="preview(form.content_thumbs,index)"></div>
          <van-icon name="clear" class="btn-close" @click="form.content_thumbs.splice(index,1)"/>
        </div>
      </van-cell-group>

      <div class="cell-title">内容详情视频：</div>
      <van-cell-group class="upload-wrap">
        <div class="flex-item">
          <input type="file" name="video" @change="videoChange">
          <div class="add-img" >
            <van-icon name="play" />
          </div>
        </div>

        <div class="flex-item" v-show="!!form.video">
          <div class="video-wrap" >
            <van-icon name="play" />
          </div>
          <van-icon name="clear" class="btn-close" @click="clearVideo"/>
        </div>
       
      </van-cell-group>

      <div class="cell-title">详情：</div>
      <van-field type="textarea" :autosize="true" v-model="form.content" placeholder="输入商品描述" />

      <div class="cell-title">是否发布商品：</div>
      <van-cell>
        <van-switch v-model="form.status" />
      </van-cell>

      <div class="filed-wrap ">
        <van-button class="submit" type="primary" :disabled="formStatus" :loading="posting" block @click="submit">提交</van-button>
      </div>
  
      <van-popup v-model="typeSelect.status" position="bottom">
          <van-tree-select
              :items="typeSelect.items"
              :main-active-index="typeSelect.mainActive"
              :active-id="typeSelect.activeId"
              @navclick="typeSelectNav"
              @itemclick="typeSelectClick"
            />
      </van-popup>
      
  
  
  
  </div>
</template>
<script>
import axios from "axios";
import { ImagePreview } from "vant";
import { Toast } from "vant";

var waterSrc =
  "data:image/png;base64,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";
function getBase64(rs, cb) {
  let src = rs.content;
  let image = new Image();
  let water = new Image();
  water.src = waterSrc;
  image.onload = function() {
    let canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);
    //添加水印
    ctx.drawImage(water, 10, 10);

    //导出base64
    var base64 = canvas.toDataURL(rs.file.type, 1);
    cb(base64);
  };
  image.onerror = function() {
    alert("转换图片失败");
  };
  image.src = src;
}
export default {
  name: "good_edit",
  data() {
    return {
      posting: false,
      isUpdate:false,
      baseUrl : '',
      typeSelect: {
        label:"",
        status: false,
        items: [],
        mainActive: 0,
        activeId: 0
      },
      form: {
        title: "",
        n_price: "", //现价
        o_price: "", //原价 非必填
        content: "",
        thumbs: [],
        type:'',
        status:false,
        content_thumbs: [],
        video: "",
        tree: []
      }
    };
  },
  computed: {
    formStatus() {
      return !String(this.form.name).trim();
    }
  },
  mounted() {
    console.log(this.$route.params)
    if(!isNaN(this.$route.params.id)){
      this.isUpdate = true;
      axios
        .get("/admin/good/find/" + this.$route.params.id)
        .then(response => {
          let {data} = response;
          if(data.status == 0){
            this.form.title = data.data.title;
            this.form.o_price = data.data.origin_price;
            this.form.n_price = data.data.new_price;
            this.form.content = data.data.content;
            this.form.type = data.data.type;

            this.form.status = data.data.status == 1 ? true : false;

            this.form.thumbs = data.data.thumbs.split(',');
            this.form.content_thumbs = data.data.content_thumbs.split(',');

            this.form.video = data.data.video;
            this.form.tree = data.data.tree ? JSON.parse(data.data.tree) : [];
            
          }else{
             Toast({
              type: "text",
              message: data.message
            });
          }
        })
        .catch(e => {
          console.log(e);
          Toast({
            type: "text",
            message: "获取分类失败，请刷新页面"
          });
        });
    }
    this.loadType();
  },
  methods: {
    loadType() {
      Toast.loading({
        type: "loading",
        mask: true,
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: "获取分类信息"
      });
      axios
        .get("/admin/type/getTypes")
        .then(response => {
          let { data } = response;
          if (data.status == 0) {
            let types = [],
              tmap = {};

            data.data.forEach(item => {
              if (item.pid == 0) {
                if (!tmap[item.id]) tmap[item.id] = {};
                tmap[item.id].text = item.name;
                tmap[item.id].children = [];
              } else {
                if (!tmap[item.pid]) {
                  tmap[item.pid] = {};
                  tmap[item.pid].children = [];
                }
                tmap[item.pid].children.push({
                  id: item.id,
                  text: item.name,
                  pid: item.pid
                });
              }
            });

            Object.keys(tmap).forEach(k => {
              types.push(tmap[k]);
            });

            this.typeSelect.items = types;
            this.typeSelectNav(0);
            Toast.clear();
          } else {
            Toast.fail(data.message);
          }
        })
        .catch(e => {
          Toast({
            type: "text",
            message: "获取分类失败，请刷新页面"
          });
        });
    },
    typeSelectNav(id) {
      this.typeSelect.mainActive = id;
      this.typeSelect.activeId = this.typeSelect.items[id].children[0].id;
      this.typeSelect.label = this.typeSelect.items[id].children[0].text;
      this.form.type = this.typeSelect.items[id].children[0].id;
      
    },
    typeSelectClick(item) {
     this.typeSelect.activeId = item.id;
     this.typeSelect.label = item.text;
     this.form.type = item.id;
     this.typeSelect.status = false;
    },
    deleteTree(idx) {
      this.form.tree.splice(idx, 1);
    },
    treeAdd() {
      this.form.tree.push({
        name: "",
        list: [],
        tag: ""
      });
    },
    preview(arr, index = 0) {
      ImagePreview(arr.map(item=> item.startsWith('data:image') ? item : this.baseUrl + item), index);
    },
    imgRead(rs) {
      getBase64(rs, r => {
        this.form.thumbs.push(r);
      });
    },
    contentImgRead(rs) {
      getBase64(rs, r => {
        this.form.content_thumbs.push(r);
      });
    },
    videoChange(e) {
      this.form.video = e.currentTarget.files[0];
      e.currentTarget.value = "";
    },
    clearVideo() {
      this.form.video = "";
    },
    reset() {
      this.posting = false;
      this.form = {
        title: "",
        type:'',
        tree:[],
        status:false,
        n_price: "", //现价
        o_price: "", //原价 非必填
        content: "",
        thumbs: [],
        content_thumbs: [],
        video: ""
      };
    },
    submit() {
      if(this.posting) return false;
      const toast = Toast.loading({
        type: "loading",
        mask: true,
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: "正在提交"
      });
      this.posting = true;
      let formdata = new FormData();

      Object.keys(this.form).forEach(k => {
        let key = k,
          v = this.form[k];

        if (
          toString.call(v) == "[object Object]" ||
          toString.call(v) == "[object Array]"
        ) {
          if (k == "thumbs" || k == "content_thumbs") {
            v = v.join("_|_");
          }else {
            v = JSON.stringify(v);
          }
        }else if(k == 'status'){
            v = v ? 1 : 0
          } 
        formdata.set(key, v);
      });

      if(this.isUpdate){
        formdata.set('id',this.$route.params.id);
      }

      var xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.onreadystatechange = ()=>{
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = xhr.response;
            if (data.status == 0) {
              Toast.success("成功");
              this.reset();
            } else {
              Toast.fail(data.message);
            }
            this.posting = false;
        }
      };
      xhr.upload.onprogress = progressFunction; //【上传进度调用方法实现】

      let url = "/admin/good/create";
      if(this.isUpdate) url = `/admin/good/update/${this.$route.params.id}`;
      xhr.open("POST", url);
      xhr.onerror = (e)=>{
          Toast.fail("请求错误");
          this.posting = false;
      }
      xhr.send(formdata);
      function progressFunction(evt) {
        let total, loaded, percent;
        if (evt.lengthComputable) {
          total = evt.total;
          loaded = evt.loaded;
          percent = Math.round(evt.loaded / evt.total * 100) + "%";
          if(total == loaded){
            toast.message = '数据处理中'
          }else{
            toast.message = `已上传 ${percent}`;
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>

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
  position: relative;

  [type="file"] {
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    opacity: 0;
  }
}
.btn-close {
  position: absolute;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  top: -15px;
  right: -10px;
  font-size: 16px;
  color: #f44336;
}
.add-img,
.video-wrap,
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
.video-wrap {
  background-color: #000;
}
.add-img,
.video-wrap {
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #d7d7d7;

  i {
    line-height: 100px;
    color: #d7d7d7;
    font-size: 46px;
  }
}

.type-group {
  padding-left: 0;
  padding-right: 0;
  .type-wrap {
    margin-bottom: 10px;
  }
  .sub-list {
    margin-left: -10px;
    background-color: #efefef;

    .van-tag {
      margin-left: 10px;
    }
  }
}
// }
</style>


