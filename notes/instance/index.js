import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>it\'s a notes. {{text}}</div>', // => render: (h) => h(APP)
  data: {
    text: 0
  }
})

app.$mount('#root') // new Vue().$mount('#root') <=> new Vue({ el: '' })

// 直接访问data对象 object.assign(app, data)
// setInterval(() => {
//   app.text += 1
// }, 1000)

// console.log(app.$data)
// console.log(app.$props) 组件传递的 props
// console.log(app.$el) 挂载节点
// console.log(app.$options) app 组件对象属性和行为
// console.log(app.$root === app) => true
// console.log(app.$children) => 子组件
// Vue 插槽概念的东西
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs) 快速定位节点
// console.log(app.$isServer) 判断是否服务端渲染然后进行操作
// unWatch = app.$watch('', (params) => {})  组件中的 watch(){} 区别app.$watch()不会自主去注销监听, 需要手动注销
//
