<template>
  <div>
    <div class="container">
    <div class="row">
      <div>
        <div class="login center">
          <h3>Login</h3>
          <form action="index.html">
            <div class="input-field">
              <i class="far fa-envelope"></i>
              <input type="email" id="email" v-model="email" placeholder="Email Address">
              <label class="white-text" for="email"></label>
            </div>
            <div class="input-field">
              <i class="fas fa-unlock-alt"></i>
              <input type="password" id="password" v-model="password" placeholder="Password">
              <label class="white-text" for="password"></label>
            </div>
            <button v-on:click="login" class="btn btn-large btn-extended grey lighten-4 black-text">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            alert(`You are logged in as ${this.email}`);
            this.$router.push('/');
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
button {
    border: 1px solid #03a9f4;
  color:#03a9f4;
  border-radius: 25px;
  padding: 10px 25px;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
}

h3 {
  font-size: 20px;
  color: #62757f;
}
.fa-envelope, .fa-unlock-alt {
font-size: 30px;
margin-right: 20px;
color: #03a9f4;
}

#email, #password {
  border: none;
  height: 49px;
  background: transparent;
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
}

.input-field {
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin-top: 20px;
}

</style>