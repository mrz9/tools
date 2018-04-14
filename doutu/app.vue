<template>
  <div class="page">
      <input type="text" v-model.trim="search" @keydown.enter="load">
      <div class="list">
          <div style="display:inline-block;" v-for="img in list" :key="img.out_id">
          <img :src="img.image_url" alt=""  @click="copy($event)" >
          </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name:'',
  data(){
      return {
          status:false,
          more:1,
          search:'',
          page:0,
          list:[]
      }
  },
  methods:{
       copy:function(e){
           let img = e.target;
           console.log(img.width,img.height)
           let canvas = document.createElement('canvas');
           canvas.widht = img.width;
           canvas.height = img.height;
           let ctx = canvas.getContext('ed');
           ctx.drawImage(img,0,0);

//           console.log(e);
//           //var div = document.getElementById('divId'); 
//         let div = e.currentTarget;
//         div.contentEditable = 'true'; 

//         var userSelection;
// if (window.getSelection) { //现代浏览器
//     userSelection = window.getSelection();
// } else if (document.selection) { //IE浏览器 考虑到Opera，应该放在后面
//     userSelection = document.selection.createRange();
// }
        
inputText.setSelectionRange(0, inputText.value.length);
        document.execCommand('copy', true);
//         var controlRange
        
//         console.log();
//         if (document.body.createControlRange) { 
//         controlRange =  rangeObject.cloneContents() || document.createDocumentFragment() document.body.createControlRange(); 
//         controlRange.addElement(div); 
//         controlRange.execCommand('Copy'); 
//         } 
//         // div.contentEditable = 'false'; 
      },
      load(){
          if(this.status || !this.search) return false;
          axios.get(`http://localhost:3000/search?word=${this.search}&page=${this.page}`)
                .then(rs=>{
                    console.log(rs);
                    let {data} = rs;
                    if(data.status == 1){
                        this.list = data.data.list;
                        this.more = data.data.more;
                        if(this.more) this.page++;

                        new ClipboardJS('.btn', {
                            container: document.getElementById('modal')
                        });
                    }else{
                        alert(data.message);
                    }
                })
                .catch(e=>{
                    console.log(e)
                })
      }
  }
}
</script>
