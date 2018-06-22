/**
 * 提供操作数据（state）的方法，直接修改 state 数据源
 * 可以形象的比喻为 SQL 语句
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
 */
export default {
  updateCount (state, num) {
    state.count = num
  }
}
