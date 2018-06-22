// import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app', // '/app/:id' => '/app/xxx' 通过 this.$route 提取
    // props: true, // 声明为 true 后，此组件里可以直接使用 props: ['id'] 接收参数，无需使用 this.$route 获取； 组件和路由解耦
    component: () => import('../views/todo/todo.vue'), // 懒加载，动态加载
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'app', // 通过 name 方便路由跳转
    meta: {
      // 保存路由的一些信息，元信息
      title: 'this is app',
      description: 'todo app'
    }
    // children: [ // 子组件，需要在父组件里配合使用 <router-view/>
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: Login
    // components: {
    //   default: Login,
    //   a: Todo
    // }
  }
]
