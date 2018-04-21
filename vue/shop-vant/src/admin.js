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
    .use(Icon);

Vue.use(VueRouter);

const routes = [
  { path: '/', component: GoodList },
  { path: '/good/add', component: GoodEdit },
  { path: '/good/list', component: GoodList },
  { path: '/type/add', component: TypeEdit }
]
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
new Vue({
  el:'#app',
  router,
  render: h => h(App)
})
