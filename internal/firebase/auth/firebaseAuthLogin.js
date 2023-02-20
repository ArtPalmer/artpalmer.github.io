// Firebase initilisation.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
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


setPersistence(auth, browserSessionPersistence)
.then(() => {
  // When login button is clicked, sign in with email and password.
  login.addEventListener('click', e => {
      console.log("click")
      // Get email and password from form.
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      // Sign in with email and password.
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // When signed in, if supplied with a ?from= value, redirect to that page, otherwise redirect to home page.
          const user = userCredential.user;
          const querys = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
          let queryValue = querys.from; //
          if (queryValue){
            window.location.href = queryValue;
          }else if (queryValue == null || queryValue == undefined || queryValue == ""){
              window.location.href = "/portal/home";
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == "auth/wrong-password") {
              alert("Incorrect password")
          }
          if (errorCode == "auth/user-not-found") {
              alert("User not found")
          }
        });
  });

});
