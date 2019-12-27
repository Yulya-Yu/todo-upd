<template>
  <div id="app">
        <div id="nav">
<Navbar :key="$route.fullPath"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
export default {
  components: {
    Navbar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap');


* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;

}
 html, body {
        height: 100%;
    }

    body {
        margin: 0;
        color: #37474f;
    }

   .main-components {
        display: flex;
        flex-direction: row;
        height: 90vh;
    }
router-link a{
  text-decoration: none;
}
</style>
