import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


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
if (queryValue){
        get(child(dbRef, '/enquiries/hidden/'+queryValue)).then((snapshot) => {
                if (snapshot.exists()) {
                var enquiryData = snapshot.val();
                var enquiryName = enquiryData["name"];
                var enquiryEmail = enquiryData["email"];
                var enquiryPhone = enquiryData["phone"];
                var enquiryBody = enquiryData["body"];
                var internalDataDisplayCode = '<p>Enquiry ID: ' + queryValue + '</p><p>Name: ' + enquiryName + '</p><p>Email: ' + enquiryEmail + '</p><p>Phone: ' + enquiryPhone + '</p><p>Body: ' + enquiryBody + '</p><button id="deleteButton">Delete enquiry.</button><script>deleteButton.addEventListener("click", function(){window.location.href = "/portal/inquiries/delete?id=" + queryValue;});';
                document.getElementById("internal_data_display").insertAdjacentHTML('afterbegin', internalDataDisplayCode);
                }else{
                        document.getElementById("internal_data_display").insertAdjacentHTML('afterbegin', '<p>Enquiry ID: ' + queryValue + '</p><p>Enquiry not found.</p>');
                }
        }).catch((error) => {console.error(error);});
}
else{
        console.error("No query value found.")
}

