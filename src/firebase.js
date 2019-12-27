import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBkL6_nT6qpA-mbC5him9lRZI-_Ll7bA-4",
    authDomain: "todo-upd.firebaseapp.com",
    databaseURL: "https://todo-upd.firebaseio.com",
    projectId: "todo-upd",
    storageBucket: "todo-upd.appspot.com",
    messagingSenderId: "1049012121621",
    appId: "1:1049012121621:web:f4fcff7b0761658f699e1c"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()


//Vue.$db = db


// new Vue({
//     router,
//     render: h => h(App)
// }).$mount('#app')

export default firebaseApp.firestore()