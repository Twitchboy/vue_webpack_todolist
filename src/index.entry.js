import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app'

import './assets/styles/global'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter) // 注册到 Vue 上，实例化后全局可以使用 vue-router 的属性和方法；实际上其实就是将 router 挂载到 vue 的原型链上， Vue.prototype.router = VueRouter
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 访问路由之前，先进行校验，比如校验用户是否登录
  console.log('before each invoked')
  next()
})

// 全局解析守卫
router.beforeResolve((to, from, next) => {
  // 2.5.0 新增，和 beforeEach 功能作用一样，只是在执行时机有所区别
  // 需要等待 全局前置守卫、路由守卫、组件守卫都解析完，才会执行 beforeResolve 守卫
  console.log('before resolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('after each invoked')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
