import Vue from 'vue'

const component = {
  // 自定义， v-model 被触发的事件名和接收值
  model: {
    prop: 'value',
    event: 'change'
  },
  props: ['value'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value"/>
    </div>
  `,
  data () {
    return {
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data () {
    return {
      text: '123'
    }
  },
  // 模拟 v-model
  // template: `
  //   <div>
  //     <Comp-one :value="text" @valueChange="inputChange(arguments)"></Comp-one>
  //   </div>
  // `,

  // 使用 v-model 的时候，子组件的 $emit 分发事件必须是 input；如果想自己定义 事件名呢，需要自己再子组件定义 model 的名称和值
  template: `
    <div>
      <Comp-one v-model="text"></Comp-one>
    </div>
  `,
  methods: {
    inputChange (arg) {
      console.log(arg)
      this.text = arg[0]
    }
  }
})
