
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, remove, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { createAndSend } from "/internal/enquiry/email_handler.js";
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


const createID_AssignToMap = new Promise((resolve, reject) => {
  var generatedID = Math.random().toString(36).substr(2, 9);
  var submitDT = new Date();
  set(ref(db, 'enquiries/map/'+(generatedID)), {
      "sumbitDate&Time": submitDT,
  });
  resolve(generatedID);
});


function submitEnquiry(enquiryName, enquiryEmail, enquiryPhone, body) {
      createID_AssignToMap.then((generatedID) => {

        set(ref(db, 'enquiries/hidden/'+ (generatedID)), {
          "name": enquiryName,
          "email": enquiryEmail,
          "phone": enquiryPhone,
          "body": body
        });
        console.log({"name": enquiryName, "email": enquiryEmail, "phone": enquiryPhone, "body": body })
        createAndSend(generatedID);
        });
        window.alert("Thank you for your enquiry, we will be in touch shortly");
      };

submitenquiry.addEventListener('click', e => {
      var enquiryName = document.getElementById("name").value;
      var enquiryEmail = document.getElementById("email").value;
      var enquiryPhone = document.getElementById("phone").value;
      var body = document.getElementById("body").value;
      if (enquiryEmail == "" && enquiryPhone != "") {
        enquiryEmail = "No Email Provided";
        submitEnquiry(enquiryName, enquiryEmail, enquiryPhone, body);
      }else if (enquiryEmail != "" && enquiryPhone == "") {
        enquiryPhone = "No Phone Provided";
        submitEnquiry(enquiryName, enquiryEmail, enquiryPhone, body);
      }else if (enquiryEmail == "" && enquiryPhone == "") {
        window.alert("Please provide either an email or phone number");
      }else{
        submitEnquiry(enquiryName, enquiryEmail, enquiryPhone, body);
      };
    });