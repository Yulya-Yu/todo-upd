<template>
      <div id="main-component">
          <TaskList @change-page="changePage" @new-page="newPage" :pages="pages" :activePage="index" />
          <Page @save-page="savePage" @delete-page="deletePage" :page="pages[index]" />
      </div>
    </template>

    <script>
    import TaskList from './TaskList'
    import Page from './Page'

    export default {
      name: 'MainComponent',
      components: {
       TaskList,
        Page
      },
        data: () => ({
        pages: [],
        index: 0
      }),
      methods: {
        newPage () {
          this.pages.push({
            todoList: '',
            todoItems: ''
          })
          this.index = this.pages.length - 1
        },
          changePage (index) {
          this.index = index
        },
              deletePage () {
          this.pages.splice(this.index, 1)
          this.index = Math.max(this.index - 1, 0)
        }
    }
}
    </script>
    <style scoped>
   #main-component {
        display: flex;
        flex-direction: row;
        height: 90vh;
    }
</style>