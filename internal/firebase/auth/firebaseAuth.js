import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
// Initialize Firebase
const firebaseConfig = {
    "apiKey": "AIzaSyBimAbyR-R07hZW1z8cI3q3k35lm9uplqE",
    "authDomain": "artpalmer-c1db0.firebaseapp.com",
    "databaseURL": "https://artpalmer-c1db0-default-rtdb.europe-west1.firebasedatabase.app",
    "projectId": "artpalmer-c1db0",
    "storageBucket": "artpalmer-c1db0.appspot.com",
    "messagingSenderId": "79542845581",
    "appId": "1:79542845581:web:9fb18c7104b8870b7de2c4"
  }
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const user = auth.currentUser;
try {signout.addEventListener('click', e => {
    signOut(auth).then(() => {console.log('User is signed out')}).catch((error) => {console.log(error)});
})
}
catch(err) {
    console.log("Sign Out button not found.")
}
onAuthStateChanged(auth, (user) => {
    if (user) {
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;

    } else {
    // User is signed out
    window.location.href = "/portal/?from=" + window.location.pathname +"/" +  window.location.search;
    }
});
