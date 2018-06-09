import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: '生命周期'
  },
  beforeCreate () {
    console.log(this.$el, '创建前')
  },
  created () {
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
  }
})

app.$mount('#root')
// 更新前后
setTimeout(() => {
  app.text = app.text + '更新了'
}, 1000)
// 挂载后， 才能执行一些DOM相关操作
