// IMPORTANT: The following code is used internally. It is not intended to be used by the public, it is authenticated.

// Firebase Initilisation
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, ref, child, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { deletedEmail } from "/internal/enquiry/email_handler.js";
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

// Gets query
const querys = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
// Stores query 
let queryValue = querys.id; //

// If querry is not null deletes the enquiry with the ID supplied in the query.
remove(child(dbRef, '/enquiries/'));
set(child(dbRef, '/enquiries/map'), {
    "totalEnquiries": 0
});
console.log("Enquiry deleted.")
// Displays message to user.
document.getElementById("internal_data_display").insertAdjacentHTML('afterbegin', '<p>Enquiries deleted.</p>');
// Deletes the enquiry. See internal\enquiry\email_handler.js for more information.
deletedEmail(queryValue);