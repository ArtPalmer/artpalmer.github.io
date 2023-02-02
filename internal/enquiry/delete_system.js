import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, get, ref, child, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


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
const db = getDatabase();
const dbRef = ref(getDatabase());

const querys = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
let queryValue = querys.id; //
if (queryValue != "**00**"){
        remove(child(dbRef, '/enquiries/hidden/'+queryValue)).then(() => {
                console.log("Enquiry deleted.")
                document.getElementById("internal_data_display").insertAdjacentHTML('afterbegin', '<p>Enquiry  ' + queryValue + ' deleted.</p>');
        }).catch((error) => {console.error(error);});
}
else{
    remove(child(dbRef, '/enquiries/hidden/')).then(() => {
        console.log("Enquiries deleted.")
        document.getElementById("internal_data_display").insertAdjacentHTML('afterbegin', '<p>All enquiries deleted.</p>');
}).catch((error) => {console.error(error);});
}
