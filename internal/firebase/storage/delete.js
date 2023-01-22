import { getStorage, ref, deleteObject } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
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
const storage = getStorage(app);
const auth = getAuth(app)

export function deleteFile(fileID){
    // Create a reference to the file to delete
    const fileRef = ref(storage, 'artworks/' + fileID + '.jpg');
    console.log("Delete - " + 'artworks/' + fileID + '.jpg')
    // Delete the file
    deleteObject(fileRef).then(() => {
      // File deleted successfully
    }).catch((error) => {
        console.error(error)
      // Uh-oh, an error occurred!
    });
}