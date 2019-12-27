<template>
     <div class="page">

<input type="text" v-model="todoList" class="todo-list" name="todoList" placeholder="введите название списка" />
    <input type="text" class="todo-input" name="todoItems" placeholder="добавить дело" v-model="newTodo" @keyup.enter="addTodo">
    <div v-if="$store.state.loading" class="lds-ring">
      <div></div><div></div><div></div><div></div>
    </div>


 <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining">
    </todo-item>


    <div class="extra-container">
      <div><label><p-check class="p-default p-round p-fill remaining" color="success" :checked="!anyRemaining" @change="allChecked"> отметить все</p-check></label></div>
      <div>осталось дел: {{ remaining }}</div>
    </div> <!-- end extra-container -->

    <div class="extra-container">
        <div>
    <button :class="{ active: filter == 'all' }" @click="changeFilter('all')">все</button>
    <button :class="{ active: filter == 'active' }" @click="changeFilter('active')">в процессе</button>
    <button :class="{ active: filter == 'completed' }" @click="changeFilter('completed')">законченные</button>
  </div>

      <div>
        <button v-if="showClearBtn" @click="clearCompleted">очистить законченные</button>
      </div>
  </div> <!-- end extra-container -->
            <button @click="deletePage()">Удалить список</button>
            <button @click="savePage()">Сохранить список</button>
  </div>
 
</template>

<script>
import TodoItem from './TodoItem'


export default {
  name: 'Page',
  components: {
TodoItem
  },
  data() {
    return {
      newTodo: '',
      idForTodo: 3,

    }
  },
  created() {
    this.$store.dispatch('initRealtimeListeners')
    this.$store.dispatch('getTodos')
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining
    },
    filter() {
      return this.$store.state.filter
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered
    },
      showClearBtn() {
      return this.$store.getters.showClearBtn
    },
      remaining() {
      return this.$store.getters.remaining
    }

  },

  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return
      }
      this.$store.dispatch('addTodo', {
        id: this.idForTodo,
        title: this.newTodo,
      })
      this.newTodo = ''
      this.idForTodo++
    },
      changeFilter(filter) {
      this.$store.dispatch('updateFilter', filter)
    },
      allChecked() {
      this.$store.dispatch('checkAll', event.target.checked)
    },
      clearCompleted() {
      this.$store.dispatch('clearCompleted')
    },
      removeTodo(id) {
      this.$store.dispatch('deleteTodo', id)
    },
    editTodo() {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit() {
      if (this.title.trim() == '') {
        this.title = this.beforeEditCache
      }
      this.editing = false
      this.$store.dispatch('updateTodo', {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'urgent': this.urgent,
        'timestamp': this.timestamp,
        'editing': this.editing,
      })
    },
    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
    },
          deletePage () {
            this.$emit('delete-page')
          },
  }
}
</script>

<style scoped>

        .page {
            width: 60%;     
            margin: 10% auto;


        }

        .content, .title {
            border-style: none;
            border-radius: 0.25rem;
            border: solid 1px lightgray;
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 1.25rem;
        }
        .title:focus {
            outline: 0;
        }
        .title {
            font-size: 2rem;
            padding: 0.5rem 1rem;
        }

        label {
            margin-bottom: 0.5rem;
            display: inline-block;
        }

 button {
  border: 1px solid #03a9f4;
  color:#03a9f4;
  border-radius: 25px;
  padding: 8px 11px;
  background: transparent;
  cursor: pointer;
  margin: 20px 20px 20px 0;
}
.active {
  background-color: #03a9f4;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
}


.todo-input, .title {
width: 80%;
height: 35px;
margin-bottom: 25px;
border-radius: 5px;
border: 1px solid #b3e5fc;
padding: 5px;
font-size: 16px;
}
.remove-item {
margin-right: 0;
margin-left: auto;
display: flex;
flex-direction: row;
 }
 .completed {
text-decoration: line-through;
color: grey;
}

.remaining {
margin: 20px 0;
}


.sort-btns {
width: 80%;
display: flex;
flex-direction: row;
}

</style>