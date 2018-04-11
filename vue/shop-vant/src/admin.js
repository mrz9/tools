import Vue from 'vue';

import App from '@/admin/index.vue';
import VueRouter from 'vue-router';
import Login from '@/admin/login.vue';
import GoodEdit from '@/admin/good_edit.vue';
import TypeEdit from '@/admin/type_edit.vue';

//vant
import { 
  NavBar,
  Icon,
  Cell, 
  CellGroup
 } from 'vant';

Vue.use(NavBar)
    .use(Cell)
    .use(CellGroup)
    .use(Icon);

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Login },
  { path: '/good/add', component: GoodEdit },
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
