<template>
  <nav id="nav-all">
      <div class="nav-wrapper">
        <div class="container">
         <p class="logo"> <router-link to="/" >Todo App</router-link></p>
          <ul class="nav-links">
            <li v-if="isLoggedIn"><span class="email">{{currentUser}}</span></li>
            <li v-if="isLoggedIn" class="dashboard"><router-link to="/MainComponent">Dashboard</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/login">войти</router-link></li>
            <li v-if="!isLoggedIn"><router-link to="/register">регистрация</router-link></li>
            <li v-if="isLoggedIn"><button v-on:click="logout" class="btn-logout">выйти</button></li>
          </ul>
        </div>
      </div>
    </nav>
  </template>

<script>
import firebase from 'firebase';
export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/login');
        });
    }
  }
};
</script>

<style>
.nav-all {
    background-color: #fff;
}

.nav-wrapper {
  max-width: 800px;
  margin: 0 auto;
  height: 10vh;
  display: flex;
  align-items: center;

}
.container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.nav-links {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.nav-links li {
  list-style: none;
  margin-right: 20px;
}

.btn-logout {
  border: 1px solid #03a9f4;
  color: #03a9f4;
  border-radius: 25px;
  padding: 10px 15px;
  background: transparent;
  cursor: pointer;
}

.email {
  color: #37474f;
}

.logo > a {
  color: #03a9f4;
  font-size: 24px;
  font-weight: 700;
  text-decoration: none;
}

.dashboard > a {
  color: #03a9f4;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
}


</style>