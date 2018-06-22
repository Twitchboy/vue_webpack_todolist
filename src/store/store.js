import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({ // 使用服务端渲染，需要 new 一个 新 Stroe， 原因和路由一样
    state: {
      count: 0
    },
    mutations: {
      updateCount (state, num) {
        state.count = num
      }
    }
  })
}
