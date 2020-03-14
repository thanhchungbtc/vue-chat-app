import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/login', name: 'Login', component: Login},
  {path: '/register', name: 'Register', component: Register},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = !!store.state.auth.user

  if (!isLogin) {
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

export default router
