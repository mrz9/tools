import Vue from 'vue';

import {} from '@/web/less/main.less'

import {
  list, 
  NavBar,
  Icon,
} from 'vant'

Vue.use(list)
    .use(NavBar)
    .use(Icon)

import App from '@/web/detail.vue';


new Vue({
  el: '#app',
  render: h => h(App)
});
