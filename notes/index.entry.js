import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>it\'s a notes. {{text}}</div>', // => render: (h) => h(APP)
  data: {
    text: 0
  }
})

app.$mount('#root') // new Vue().$mount('#root') <=> new Vue({ el: '' })

setInterval(() => {
  app.text += 1
}, 1000)
