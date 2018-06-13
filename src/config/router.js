import Router from 'vue-router'
import routes from './routes'

// 为什么不直接使用 new 然后导出去呢？
// 直接这里 new 一个 Router， 会导致全局 import 都是一个 router；想要一个新的实例对象就做不到了
// 因为需要用到服务端渲染（SSR）, 使用同一个 router 实例对象，服务端渲染的时候会导致内存溢出
// const router = new Router({ routes })
// exprot default router

export default () => {
  return new Router({
    routes
  })
}
