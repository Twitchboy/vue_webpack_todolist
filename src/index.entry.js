import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'

import './assets/styles/global'
import createRouter from './config/router'

Vue.use(VueRouter) // 注册到 Vue 上，实例化后全局可以使用 vue-router 的属性和方法；实际上其实就是将 router 挂载到 vue 的原型链上， Vue.prototype.router = VueRouter

const router = createRouter()

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
