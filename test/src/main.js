import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Auth from '../../src/index'

function checkAuth(field) {
  switch (field) {
    case 'A':
      return false
    default:
      return true
  }
}
Vue.use(Auth, checkAuth)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
