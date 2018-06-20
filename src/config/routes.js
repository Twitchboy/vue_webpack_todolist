import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: Todo,
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
  }
]
