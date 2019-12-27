<template>
  <div class="todo-item">
    <div class="todo-item-left">
        <input type="checkbox" v-model="completed" @change="doneEdit">
        <div v-if="!editing" @dblclick="editTodo" class="todo-item-label" :class="{ completed : completed }">{{ title }}</div>
        <input v-else class="todo-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
    </div> <!-- end todo-item-left -->
    <div class="options">
      <span class="date">{{moment(date).format('YYYY-MM-DD')}}</span>
       <input type="checkbox" class="urgent" v-model="urgent">

      <span class="remove-item">
        <i class="far fa-trash-alt" @click="showModal(todo.id)"></i>
                         <div class="modal-overlay" id="modal-overlay" v-show="selectedId == todo.id">
                              <div class="modal" >
                                     <p>Удалить дело " {{todo.title}} " ?</p>
                                     <div class="confirm-btns">
                                       
                                        <button @click="(removeTodo(todo.id)), (closeModal)" class="delete-btn-modal">Да</button>
                                        <button @click="closeModal" class="cancel-btn">Нет</button>
                                     </div>
                              </div>
                              </div>

      </span>
    </div>
  </div> <!-- end todo-item -->
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      'id': this.todo.id,
      'title': this.todo.title,
      'completed': this.todo.completed,
      'timestamp': this.todo.date,
      'urgent': this.todo.urgent,
      'editing': this.todo.editing,
      'beforeEditCache': '',
      'isModalVisible': false,
      'selectedId':'',
    }
  },

  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed
    },
    todo() {
      this.title = this.todo.title
      this.completed = this.todo.completed
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
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
        'timestamp': this.timestamp,
        'editing': this.editing,
      })
    },
    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
    },
      showModal(id) {
        this.selectedId = id;
      },
      closeModal() {
        this.selectedId='';
      },

  }
}
</script>
<style>
.modal {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 300px;
    position: fixed;
    height: 140px;
    z-index: 10;
    background: #fff;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.modal-overlay {
  z-index: 8;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, 0.5)
}
.modal p {
width: 80%;
font-size: 16px;
line-height: 20px;
text-align: center;
color: #03a9f4;
margin-top: 30px;
font-weight: 700;
}
.confirm-btns button {
border: none;
font-size: 16px;
line-height: 20px;
text-align: center;
color: #fff;
}
.delete-btn-modal {
width: 60px;
height: 40px;
background: #FF7373;
margin-right: 20px;
}
.cancel-btn {
width: 60px;
height: 40px;
background: #03a9f4;
}

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
.todo-item {
 display: flex;
 flex-direction: row;
 width:80%;
 margin: 0;


}
.todo-item-left {
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
margin-bottom: 15px;
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

.options {
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
 .date, .urgent, .completed {
  margin-right: 20px;
}
.date {
  font-size: 12px;
}

</style>