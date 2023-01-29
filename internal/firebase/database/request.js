import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { uploadToCloud } from "../storage/upload.js";
import { deleteFile } from "../storage/delete.js";
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
var totalArtworksDB = null


submitArtwork.addEventListener('click', e => {
  
  get(child(dbRef, `gallery/map/totalArtworks`)).then((snapshot) => {
    if (snapshot.exists()) {
      window.alert("Artwork started uploading!")
      totalArtworksDB = snapshot.val()
      
      console.log(totalArtworksDB)

      var artworkName = document.getElementById("artworkName").value;
      var artworkDescription = document.getElementById("artworkDescription").value;
      var artworkCompletionDate = document.getElementById("artworkCompletionDate").value;
      var materialsUsed = document.getElementById("materialsUsed").value;
      var artworkPrice = document.getElementById("artworkPrice").value;
      var artworkPictureURL = "https://firebasestorage.googleapis.com/v0/b/artpalmer-c1db0.appspot.com/o/artworks%2F" + (totalArtworksDB + 1) + ".jpg?alt=media"
      set(ref(db, 'gallery/artwork'+ (totalArtworksDB + 1)), {
        "artworkName": artworkName,
        "artworkDescription": artworkDescription,
        "artworkCompletionDate": artworkCompletionDate,
        "materialsUsed": materialsUsed,
        "artworkPrice": artworkPrice,
        "artworkPictureURL": artworkPictureURL
      });
      
      console.log(artworkName, artworkDescription, artworkCompletionDate, materialsUsed)
    

      set(ref(db, 'gallery/map'), {
        "totalArtworks": (totalArtworksDB + 1)
      });
      console.log("Update galler/ymap")
      uploadToCloud(totalArtworksDB + 1)
    } else {
      console.warn("Error GETTING gallery/map/totalArtworks");
    }
  }).catch((error) => {
    console.error(error);
  });
});

deleteArtwork.addEventListener('click', e => {
  if (confirm("Do you really want to delete your artworks PERMANENTLY?")) {
    get(child(dbRef, `gallery/map/totalArtworks`)).then((snapshot) => {
      if (snapshot.exists()) {
        var totalArtworks = snapshot.val()
        if (totalArtworks == 0){
          
        }
        else{
          console.log(totalArtworks)
          var i = 0
          new Array(totalArtworks + 1).fill().map(() => {
            remove(ref(db, 'gallery/artwork' + (i++)))
            deleteFile(i)
            set(ref(db, 'gallery/map/'), {
              "totalArtworks": totalArtworks--
            });
            console.log('gallery/artwork' + (i))
            })
        }
        }
      })
    }
});