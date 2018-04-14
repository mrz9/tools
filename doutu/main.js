import Vue from 'vue';
import app from './app.vue';

import {VueMasonryPlugin} from 'vue-masonry';

Vue.use(VueMasonryPlugin)

new Vue({
    el:'#app',
    render:h=>h(app)
})