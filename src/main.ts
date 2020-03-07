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
import {container} from "@/di";
import {getModule} from "vuex-module-decorators";
import {AuthStore} from "@/store/authStore";

Vue.config.productionTip = false

const authService = container.getAuthService()
authService.listen().subscribe((user) => {

})

router.beforeEach((to, from, next) => {
  const user = getModule(AuthStore, store).user
  if (!user) {
    if (to.name !== 'Login' && to.name !== 'Register') {
      return next({name: 'Login'})
    }
  } else {
    if (to.name === 'Login' || to.name === 'Register') {
      return next({name: 'Home'})
    }
  }
  return next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
