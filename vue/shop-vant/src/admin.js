import Vue from 'vue';

import App from '@/admin/index.vue';
import VueRouter from 'vue-router';
import Login from '@/admin/login.vue';
import GoodList from '@/admin/list.vue';
import GoodEdit from '@/admin/good_edit.vue';
import TypeEdit from '@/admin/type_edit.vue';
import 'vant/lib/vant-css/icon-local.css';

//test
// require('@/test/mock.js')

require('@/admin/less/main.less');

//vant
import { 
  NavBar,
  Icon,
  Cell, 
  CellGroup,
  Field,
  Uploader,
  Picker,
  Popup,
  Button,
  Tag,
  Toast,
  TreeSelect,
  List,
  Search,
  ,
  ContactCard
 } from 'vant';

Vue.use(TreeSelect);
Vue.use(NavBar)
    .use(Cell)
    .use(TreeSelect)
    .use(CellGroup)
    .use(Field)
    .use(Uploader)
    .use(Picker)
    .use(Popup)
    .use(Button)
    .use(Tag)
    .use(ContactCard)
    .use(List)
    .use(Search)
    .use(CellSwipe)
    .use(Icon);

Vue.use(VueRouter);

//创建一个空vue来中转事件
const EventPaster = new Vue();

const routes = [
  { path: '/', name:'home',component: GoodList },
  { path: '/good/add', name:'good_add', component: GoodEdit },
  { path: '/good/list',name:'list', component: GoodList },
  { path: '/type/add', name:'type_add',component: TypeEdit }
]
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
new Vue({
  el:'#app',
  data:{
    ep:EventPaster
  },
  router,
  render: h => h(App)
})
