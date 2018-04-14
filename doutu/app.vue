<template>
  <div class="page">
      <div class="search-wrap">
        <input type="text" v-model.trim="search" @keydown.enter="load">
        <p v-show="status">加载中...</p>
      </div>
      <div class="list">
          <div style="display:inline-block;" click="copyDiv" v-for="img in list" :key="img.out_id">
            <img :src="img.image_url" alt=""  @click="copy($event)">
          </div>
      </div>
      <div class="bottom-wrap">
        <button type="button" class="next" @click="load" v-show="more != 0">下一页</button>
      </div>
      <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name:'',
  data(){
      return {
          status:false,
          more:0,
          search:'',
          page:0,
          list:[]
      }
  },
  mounted(){
      
  },
  methods:{
       copyDiv(e){
            let div = e.currentTarget;
            div.setAttribute('contenteditable',true);
            div.focus();
            
            document.execCommand('SelectAll');
            document.execCommand("Copy"); 
            div.blur();
           
       },
      load(){
          if(this.status || !this.search) return false;
          this.status = true;
          axios.get(`http://localhost:3000/search?word=${this.search}&page=${this.page}`)
                .then(rs=>{
                    console.log(rs);
                    let {data} = rs;
                    if(data.status == 1){
                        this.list = data.data.list;
                        this.more = data.data.more;
                        if(this.more) this.page++;
                    }else{
                        alert(data.message);
                    }
                    this.status = false;
                })
                .catch(e=>{
                    console.log(e);
                    this.status = false;
                    
                })
      },
      copy(e){
          let img = e.currentTarget;
          img.setAttribute('crossOrigin', 'anonymous');

        //   let canvas = document.createElement('canvas');
            let canvas = document.getElementById('canvas');
          let ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img .height;

          ctx.drawImage(img,0,0);
          setTimeout(()=>{
              canvas.toBlob(function(blob) {
                    console.log(blob);
                    // var newImg = document.createElement("img"),
                    //     url = URL.createObjectURL(blob);

                    // newImg.onload = function() {
                    //     // no longer need to read the blob so it's revoked
                    //     URL.revokeObjectURL(url);
                    // };

                    // newImg.src = url;
                    // document.body.appendChild(newImg);
                });
          },500)
      }
  }
}
</script>

<style lang="less">
* {
    padding:0;
    margin:0;
    box-sizing:border-box;
}

.search-wrap {
    position:fixed;
    top:0;
    left:0;
    width: 100%;
    background-color:rgba(255,255,255,.6);
    padding:10px;
    box-shadow: 0 1px 5px #e0e0e0;
    input {
        padding:6px 10px;
        display: block;
        width:100%;
        height:32px;
        border:1px solid #e0e0e0;
    }
    p {
        color:#999;
        line-height: 52px;
        text-align: center;
        font-size:28px;
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height: 100%;
        background-color:rgba(255,255,255,.8);
    }
}

.list {
    margin-top:74px;
    padding:0 10px;
}
.bottom-wrap {
    margin:10px;
    .next {
        border-radius: 100px;
        height:34px;
        background-color:rgb(2, 150, 248);
        color:#fff;
        border:none;
        width:100%;
        display: block;
    }
}

</style>

