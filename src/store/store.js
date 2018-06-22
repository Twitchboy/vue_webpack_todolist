import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'

export default () => {
  return new Vuex.Store({ // 使用服务端渲染，需要 new 一个 新 Stroe， 原因和路由一样
    state: defaultState,
    mutations,
    getters
  })
}
