import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: '生命周期'
  },
  beforeCreate () {
    // 做 ssr 时，会涉及
    console.log(this.$el, '创建前')
  },
  created () {
    // 做 ssr 时，会涉及
    console.log(this.$el, '创建后')
  },
  beforeMount () {
    console.log(this.$el, '挂载前')
  },
  mounted () {
    console.log(this, '挂载后')
  },
  beforeUpdate () {
    console.log(this, '更新前')
  },
  updated () {
    console.log(this, '更新后')
  },
  beforeDestroy () {
    console.log(this, '销毁前')
  },
  destroyed () {
    console.log(this, '销毁后')
  },
  render (h) {
    console.log('render function')
    return h('div', {}, this.text)
  },
  // render function 报错时 才会报错，当前组件
  renderError (h, error) {
    return h('div', {}, error.stack)
  },
  //
  errorCaptured () {
    // 捕获一个来自子孙组件的错误时被调用，收集错误，向上冒泡，并且正式环境可以使用
  }
})

app.$mount('#root')
// 更新前后
setTimeout(() => {
  app.text = app.text + '更新了'
}, 1000)
// 挂载后， 才能执行一些DOM相关操作
