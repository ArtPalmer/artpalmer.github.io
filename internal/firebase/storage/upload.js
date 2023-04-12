// Firebase initialisation.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { Fireworks } from 'https://esm.run/fireworks-js';



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
const auth = getAuth(app);
const storage = getStorage(app);
var file= [];

export function uploadToCloud(artworkID){
    // artworkUpload location in firebase storage.
// Update the file name in artworkStorageRef to have .jpeg extension
const artworkStorageRef = ref(storage, ('/artworks/' + artworkID + '.jpeg'));

var fileElement = document.getElementById("artworkImageFile");
file = fileElement.files[0];

// Create a new File object with .jpeg extension
const convertedFile = new File([file], artworkID + '.jpeg', {type: 'image/jpeg'});

// Upload the converted file to Firebase Storage
uploadBytes(artworkStorageRef, convertedFile).then((snapshot) => {
    document.getElementById("alert-success").innerHTML = `Artwork uploaded successfully! - <a href='https://artpalmer.com/artwork/?id=${artworkID}'>Click here to view</a>`;
    document.getElementById("alert-success").style.display = "block";
    setTimeout(function(){ document.getElementById("alert-success").style.display = "none"; }, 3000);
});

}

