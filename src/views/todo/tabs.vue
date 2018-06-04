<template>
    <div class="helper">
        <span class="left">{{ unFinishToDoLength }} 个任务</span>
        <span class="tabs">
            <span
                v-for="state in states"
                :key="state"
                :class="[state, filter === state ? 'actived' : '']"
                @click="toggleFilter(state)"
            >
                {{ state | statesMap }}
            </span>
        </span>
        <span class="clear" @click="clearAllCompleted">清空已完成任务</span>
    </div>
</template>

<script>
export default {
    props: {
        filter: {
            type: String,
            required: true
        },
        todos: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            // 对照表 => ['所有', '进行中', '已完成']
            states: ['all', 'active', 'completed']
        }
    },
    filters: {
        statesMap: (state) => {
            // 对照表 => ['所有', '进行中', '已完成']
            return state === 'all' ? '所有' : state === 'active' ? '进行中' : '已完成';
        }
    },
    computed: {
        // 过滤出未完成任务数
        unFinishToDoLength () {
            return this.todos.filter(todo => !todo.completed).length;
        }
    },
    methods: {
        // 切换 tab
        toggleFilter (state) {
            console.log(state);
            this.$emit('toggle', state);
        },
        clearAllCompleted () {
            this.$emit('clearAll')
        }
    },
    created () {}
}
</script>

<style lang="stylus" scoped>
	.helper{
	    font-weight 100
	    display flex
	    justify-content space-between
	    padding 5px 0
	    line-height 30px
	    background-color #ffffff
	    font-size 14px
	    font-smoothing:antialiased;
	}
	.left, .clear, .tabs{
	    padding 0px 10px
	    box-sizing border-box
	}
	.left, .clear{
	    width 150px
	}
	.left{
	    text-align left
	}
	.clear {
	    text-align:right
	    cursor pointer
	}
	.tabs{
	    width 200px
	    display flex
	    justify-content space-around
	    * {
	        display inline-block
	        padding 0px 10px
	        cursor pointer
	        border 1px solid rgba(175,47,47,0)
	        &.actived{
	            border-color rgba(175,47,47,0.4)
	            border-radius 5px
	        }
	    }
	}
</style>
