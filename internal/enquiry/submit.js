
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
var totalEnquiriesDB = null


submitenquiry.addEventListener('click', e => {
  
  get(child(dbRef, `enquiries/map/totalEnquiries`)).then((snapshot) => {
    if (snapshot.exists()) {
    
      totalEnquiriesDB = snapshot.val()
      
      console.log(totalEnquiriesDB)

      var enquiryName = document.getElementById("name").value;
      var enquiryEmail = document.getElementById("email").value;
      var body = document.getElementById("body").value;
      set(ref(db, 'enquiries/hidden/'+ (totalEnquiriesDB + 1)), {
        "name": enquiryName,
        "email": enquiryEmail,
        "body": body
      });


      set(ref(db, 'enquiries/map'), {
        "totalEnquiries": (totalEnquiriesDB + 1)
      });
      console.log("Update galler/ymap")
    } else {
      console.warn("Error GETTING Enquiries/map/totalEnquiries");
    }
  }).catch((error) => {
    console.error(error);
  });
});
