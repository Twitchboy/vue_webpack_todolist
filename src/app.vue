<style lang="stylus" scoped>
#app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    .cover
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background #999
        opacity .9
        z-index 1
</style>

<template>
    <div id="app">
        <div class="cover">
            <Header></Header>
            <!-- <Todo></Todo> -->
            <router-view />
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Header from './layout/header'
import Footer from './layout/footer'
import Todo from './views/todo/todo'

export default {
  components: {
    Header,
    Todo,
    Footer
  },
  data () {
    return {
      text: 'vue start!!!'
    }
  }
}
</script>
