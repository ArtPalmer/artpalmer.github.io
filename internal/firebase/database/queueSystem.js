import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, off } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "are you sure you want to leave?";
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
                         //Webkit, Safari, Chrome
    get(child(dbRef, `queue`)).then((snapshot) => {
        var connected = undefined
        
    
            if (snapshot.exists()) {
    
                var sn = snapshot.val()
    
                connected = sn["connected"]
    
                set(ref(db, 'queue'), {
                    "inQueue": (sn["inQueue"]),
                    "connected": (connected -= 1)
                  });
    
            } else {
                console.warn("Error GETTING queue/connected");
            }
        }).catch((error) => {
            console.error(error);
        });
        return confirmationMessage;   
  });
window.addEventListener("obeforeunload", function (){

});
window.onload = function() {
    console.log("Page loaded");
    get(child(dbRef, `queue`)).then((snapshot) => {
    var connected = undefined
    

        if (snapshot.exists()) {

            var sn = snapshot.val()

            connected = sn["connected"]

            if (connected > 50){

                set(ref(db, 'queue'), {
                    "connected": (sn["connected"]),
                    "inQueue": (sn["inQueue"] += 1)
                })
                off(dbRef)
                console.log("Too many connections, you have been placed in the queue.")

            } else {
                set(ref(db, 'queue'), {
                    "inQueue": (sn["inQueue"]),
                    "connected": (connected += 1)
                  });
            }


        } else {
            console.warn("Error GETTING queue/connected");
        }
    }).catch((error) => {
        console.error(error);
    });
    
};
