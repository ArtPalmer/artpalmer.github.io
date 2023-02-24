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
var i = 0;
get(child(dbRef, '/enquiries/')).then((snapshot) => {
        if (snapshot.exists()){
                var enquiriesData = snapshot.val();
                var totalEnquiries = enquiriesData["map"]["totalEnquiries"];
                // Get the first enquiry from the json


                console.log(totalEnquiries);
                

                if (totalEnquiries >= 1){
                        // while (i < totalEnquiries){
                        //         var internalDataDisplayCode = '<a style="display: block;">' + enquiriesData + '</a>';
                        //         console.log(enquiriesData[i]);
                        //         document.getElementById("internal_data_display").insertAdjacentHTML('afterbegin', internalDataDisplayCode);
                        //         i++
                        // }
                        for(var i = 0; i < totalEnquiries; i++)
                        {
                                var enquiries = enquiriesData["map"][i]["generatedID"];
                                console.log((i + 1) + " " + enquiries);
                                var enquiryName = enquiriesData[enquiries]["name"];
                                console.log(enquiryName);
                                var internalDataDisplayCode = '<a href="/portal/enquiries/get/?id=' + enquiries + '" style="display: block;">' + enquiryName + ' - ' + enquiries + '</a>';
                                document.getElementById("internal_data_display").insertAdjacentHTML('afterbegin', internalDataDisplayCode);
                        }
} else {
        console.log("No Enquiries");
        var internalDataDisplayCode = '<p>No Enquiries found.</p><p>If you think this is a mistake tell me!</p>';
        document.getElementById("internal_data_display").insertAdjacentHTML('afterbegin', internalDataDisplayCode);
                }}}).catch((error) => {console.error(error);});
