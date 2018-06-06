<template>
    <section class="todo-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="What are you doing?"
            @keyup.enter="addTodo"
        >
        <div class="item-box">
            <Item
                v-for="todo in filteredTodos"
                :key="todo.id"
                :todo="todo"
                @del="deleteTodo"
            ></Item>
        </div>
        <Tabs
            :filter="filter"
            :todos="todos"
            @toggle="changeTab"
            @clearAll="clearAllCompleted"
        ></Tabs>
    </section>
</template>

<script>
import Item from './item';
import Tabs from './tabs';

export default {
    components: {
        Item,
        Tabs
    },
    data () {
        return {
            // todo 容器
            todos: [],
            filter: 'all',
            todoId: 0
        };
    },
    computed: {
        // 显示不同状态的任务
        filteredTodos () {
            if (this.filter === 'all') return this.todos;

            // 判断是否完成
            const completed = this.filter === 'completed';
            return this.todos.filter(todo => todo.completed === completed);
        }
    },
    methods: {
        addTodo (e) {
            if (e.target.value.trim().length === 0) return;
            // 新增任务都放在第一位
            this.todos.unshift({
                id: this.todoId++,
                content: e.target.value.trim(),
                completed: false
            });
            e.target.value = '';
            console.log(this.todos);
        },
        deleteTodo (id) {
            this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
        },
        // 更换 tab
        changeTab (state) {
            this.filter = state;
        },
        clearAllCompleted () {
            this.todos = this.todos.filter(todo => !todo.completed);
        }
    }
}
</script>

<style lang="stylus" scoped>
    .todo-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
        .add-input {
            position: relative;
            margin: 0;
            width: 100%;
            font-size: 24px;
            font-family: inherit;
            font-weight: inherit;
            line-height: 1.4em;
            border: 0;
            outline: none;
            color: inherit;
            padding: 6px;
            border: 1px solid #999;
            box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            font-smoothing: antialiased;
            padding: 16px 16px 16px 60px;
            border: none;
            box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
        }
        .item-box {
            max-height 600px
            overflow hidden
            overflow-y scroll;
        }
    }

</style>
