import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import '../src/assets/css/fontawesome-free-5.14.0-web/css/all.min.css';
import '../src/assets/css/main.css';
import '../src/assets/css/util.css';
import '../src/assets/js/sb-admin-2.min.js'
import '../src/assets/css/sb-admin-2.min.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
