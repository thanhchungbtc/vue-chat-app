import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/vuerx'
import './plugins/firebase'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "./assets/app.css"
import "./di"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
