// Firebase initilisation.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { uploadToCloud } from "../storage/upload.js";
import { deleteFile } from "../storage/delete.js";
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



// Function to add a new artwork to the database.
async function addArtwork() {
    // Get the artwork data.
    var generatedID = Math.random().toString(36).substr(2, 9);
    var artworkName = document.getElementById("artworkName").value;
    var artworkShortDescription = document.getElementById("artworkDescription").value;
    var artworkLongDescription = document.getElementById("artworkDescription").value;
    var artworkCompletionDate = document.getElementById("artworkCompletionDate").value;
    var materialsUsed = document.getElementById("materialsUsed").value;
    var artworkPrice = document.getElementById("artworkPrice").value;
    var artworkPictureURL = "https://firebasestorage.googleapis.com/v0/b/artpalmer-c1db0.appspot.com/o/artworks%2F" + generatedID + ".jpg?alt=media";
    // Format the data.

    // Get the amount of artworks in the database.
    await get(child(dbRef, 'gallery/')).then((snapshot) => {
        if (snapshot.exists()) {
            var artworks = snapshot.val();
            var artworkCount = artworks.length;
            var listNumber = artworkCount - 1;
            var artworkData = { 0:{
                "artworkData": artworkName,
                "artworkDescription": {
                    "shortDescription": artworkShortDescription,
                    "longDescription": artworkLongDescription
                },
                "materialsUsed": materialsUsed,
                "artworkPrice": artworkPrice,
                "artworkPictureURL": artworkPictureURL,
                "artworkId": generatedID
            }

        };
            set(ref(db, 'gallery/'), artworkData);
            console.log(artworkCount);
        } else {
            console.log(artworks);
            var artworkData = { "temp ":{
                "artworkData": artworkName,
                "artworkDescription": {
                    "shortDescription": artworkShortDescription,
                    "longDescription": artworkLongDescription
                },
                "materialsUsed": materialsUsed,
                "artworkPrice": artworkPrice,
                "artworkPictureURL": artworkPictureURL,
                "artworkId": generatedID
            }};
            artworkData = 0;
            
            set(ref(db, 'gallery/'), artworkData);
        }
    });

    // Add the artwork to the database.

    return "Artwork added to database.";
}
submitArtwork.addEventListener("click", e => {
    addArtwork().then(
        function(value) {console.log(value)},
        function(error) {console.error(error)}
      );
});
