import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
const firebaseConfig = {
    "apiKey": "AIzaSyBimAbyR-R07hZW1z8cI3q3k35lm9uplqE",
    "authDomain": "artpalmer-c1db0.firebaseapp.com",
    "databaseURL": "https://artpalmer-c1db0-default-rtdb.europe-west1.firebasedatabase.app",
    "projectId": "artpalmer-c1db0",
    "storageBucket": "artpalmer-c1db0.appspot.com",
    "messagingSenderId": "79542845581",
    "appId": "1:79542845581:web:9fb18c7104b8870b7de2c4"
  }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
var file= [];
export function uploadToCloud(artworkNumber){
    // document.getElementById("loader_container").style.display = "block";
    const artworkStorageRef = ref(storage, ('/artworks/' + artworkNumber + '.jpg'));

    console.log('/artworks/' + artworkNumber + '.jpg')
    
    var fileElement = document.getElementById("artworkimageFile");
    file = fileElement.files[0];
    console.log(file)
    uploadBytes(artworkStorageRef, file).then((snapshot) => {
        // document.getElementById("loader").style.display = "none";
        window.alert("Artwork added to database.")
    });
}

