import Vue from 'vue'

// 定义二级组件
const component = {
  props: {
    active: Boolean,
    propOne: Number
    // onChange: Function  // 使用 this.$emit 方式监听父组件事件，就不需要接收
  },
  template: `<div>
    <input type="text" v-model="text"/>
    <p v-show="active">{{text}}</p>
    <button @click="handleChange">{{propOne}}</button>
  </div>`,
  data () { // 注册组件，不是通过 new 的时候，定义数据 data 必须是一个 func
    return {
      text: 'This is component.'
    }
  },
  methods: {
    handleChange (e) {
      console.log(e.target)
      this.$emit('numberChange') // 触发父组件方法
    }
  }
}

// 全局定义组件
// Vue.component('CompOne', component)

new Vue({
  components: { // 局部组件
    CompOne: component
  },
  el: '#root',
  template: `<div>
    <Comp-one :active="true" :prop-one="propOne" @numberChange="add"></Comp-one>
  </div>`,
  data: {
    propOne: 1
  },
  methods: {
    add () {
      this.propOne += 1
    }
  }
})
