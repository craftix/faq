import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/tomorrow.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPen, faTrash);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueHighlightJS);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
