/**
 * 获取数据方法
 * 可以比喻成 store 里的计算属性 （computed）
 * getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
 */
export default {
  fullName (state) {
    return `${state.firstName} ${state.lastName}`
  },
  test: (state, fetters) => {
    return fetters.fullName + ' 次数：' + state.count
  },
  testMethod: state => id => {
    return id
  }
}
