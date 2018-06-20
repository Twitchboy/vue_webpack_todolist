import Router from 'vue-router'
import routes from './routes'

// 为什么不直接使用 new 然后导出去呢？
// 直接这里 new 一个 Router， 会导致全局 import 都是一个 router；想要一个新的实例对象就做不到了
// 因为需要用到服务端渲染（SSR）, 使用同一个 router 实例对象，服务端渲染的时候会导致内存溢出
// const router = new Router({ routes })
// exprot default router

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base' // 默认添加的基础路径
    // linkActiveClass: 'active-link', // 配置 <router-link> 标签类名，来各它设置全局样式
    // linkExactActiveClass: 'exact-active-link' // 配置 <router-link> 标签类名，来各它设置全局样式
    scrollBehavior (to, from, savedPosition) {
      // 页面路径跳转，是否需要滚动
      // to 路由跳转到那个路由
      // from 从那个路由跳转过来
      // 从 /app 跳转到 /login,  to => /login  from => /app 返回的是一个路由对象
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    }
    // 当浏览器不支持 history.pushState 控制路由是否应该回退到 hash 模式。默认值为 true。
    // fallback: true
    // query 指的是 url ? 号以后的参数; 下面两种方法让我嫩可以定制返回 query 的数据结构
    // parseQuery (query) { // query: string
    // },
    // // url ? 号以后的参数
    // stringifyQuery (obj) {}
  })
}
