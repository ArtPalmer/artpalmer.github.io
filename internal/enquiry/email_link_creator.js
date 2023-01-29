
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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

get(child(dbRef, `enquiries/map/totalEnquiries`)).then((snapshot) => {
  if (snapshot.exists()) {
    var totalEnquiriesDB = snapshot.val()
    
    var url = "https://artpalmer.github.io/portal/enquiries/get?id=" + (totalEnquiriesDB);
    document.getElementById("email").insertAdjacentHTML('afterbegin', '<p>A new enquiry has been submitted, got to <a href=' + url + '>'+ url + '</a></p><p></p><p>Love from,</p><p style="margin-top:-18px;" >The Enquiry System :)</p>')

  }});