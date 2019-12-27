<template>
        <div class="tasklist">
            <ul>
                <li v-for="(page, index) of pages" :key="index" class="page" v-bind:class="{ 'active': index === activePage }" @click="changePage(index)">
                    <div>{{todoList}}</div>
                </li>
                <li class="new-page" @click="newPage()">Новый список +</li>
            </ul>
        </div>
    </template>

    <script>
      export default {
        name: 'TaskList',
     props: ['pages', 'activePage'],
      methods: {
        changePage (index) {
          this.$emit('change-page', index)
        },
        newPage () {
          this.$emit('new-page')
        }
      }
}
    </script>
    