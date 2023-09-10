// IMPORTANT: The following code is used internally. It is not intended to be used by the public, it is authenticated.

// Firebase Initialisation
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const firebaseConfig = {
  "apiKey": "AIzaSyBimAbyR-R07hZW1z8cI3q3k35lm9uplqE",
  "authDomain": "artpalmer-c1db0.firebaseapp.com",
  "databaseURL": "https://artpalmer-c1db0-default-rtdb.europe-west1.firebasedatabase.app",
  "projectId": "artpalmer-c1db0",
  "storageBucket": "artpalmer-c1db0.appspot.com",
  "messagingSenderId": "79542845581",
  "appId": "1:79542845581:web:9fb18c7104b8870b7de2c4"
}

const dbRef = ref(getDatabase());

// Get query value.
const querys = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
// Stores query value.
let queryValue = querys.id; //
// If queryValue has a value, get the enquiry data.
if (queryValue){
        if (queryValue){
                // Get the enquiry data.
                get(child(dbRef, '/enquiries/'+queryValue)).then((snapshot) => {
                        if (snapshot.exists()) {
                                var enquiryData = snapshot.val();
                                // Stores the data values into variables.
                                var enquiryName = enquiryData["name"],
                                enquiryEmail = enquiryData["email"],
                                enquiryPhone = enquiryData["phone"],
                                enquiryBody = enquiryData["body"];
                                // Display the data.
                                var emailCode = `<a style="display:block; color:#F3E8EE" href='mailto:art@artpalmer.com?body=` + ` ----------Don't delete%2C%20this%20will%20help%20us%20identify%20your%20enquiry%20later-----------%0A ${queryValue}><p>${enquiryEmail}</p></a>`
                                var internalDataDisplayCode = '<p>Enquiry ID: ' + queryValue + '</p><p>Name: ' + enquiryName + '</p>' + emailCode + '<p onclick="window.open(\'tel:'+ enquiryPhone + '\');">Phone: ' + enquiryPhone + '</p><p>Body: ' + enquiryBody + '</p>';
                                document.getElementById("internal_data_display").insertAdjacentHTML('afterbegin', internalDataDisplayCode);
                        }
                        // If the enquiry does not exist, display an error.
                        else{
                                document.getElementById("internal_data_display").insertAdjacentHTML('afterbegin', '<p>Enquiry ID: ' + queryValue + '</p><p>Enquiry not found.</p>');
                        }
                }).catch((error) => {console.error(error);});
        }
}  
// If queryValue does not have a value, display an error.
else{
        console.error("No query value found.")
}



