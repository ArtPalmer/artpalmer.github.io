// Firebase initilisation.
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, child, get, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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
var totalArtworksDB = null
submitArtwork.addEventListener('click', e => {
  get(child(dbRef, 'gallery/map/totalArtworks')).then((snapshot) => {
    
    var artworkName = document.getElementById("artworkName").value;    var artworkLongDescription = document.getElementById("artworkLongDescription").value;
    var artworkCompletionDate = document.getElementById("artworkCompletionDate").value;
    artworkCompletionDate = artworkCompletionDate.replace(/\//g, '-');
    artworkCompletionDate = artworkCompletionDate.replace(/-/g, '-');
    var materialsUsed = document.getElementById("materialsUsed").value;
    var artworkPrice = document.getElementById("artworkPrice").value;
    var artworkSize = document.getElementById("artworkSize").value;
    var sold = document.getElementById("sold").checked;
    var digital = document.getElementById("digital").checked;

      var generatedID = Math.random().toString(36).substr(2, 9);
      var currentDate = new Date();
      var currentYear = String(currentDate.getFullYear());
      var currentMonth = String(currentDate.getMonth() + 1);
      var currentDay = String(currentDate.getDate());
      var currentHour = String(currentDate.getHours());
      var currentMinute = String(currentDate.getMinutes());
      var currentSecond = String(currentDate.getSeconds());
      var formated = currentYear + currentMonth + currentDay + currentHour + currentMinute + currentSecond;
      generatedID = formated + generatedID;
      console.log(formated);
      console.log(generatedID);
      console.log(snapshot.val());
      // var totalArtworks = snapshot.val();
      
      // totalArtworks = totalArtworks + 1;

      // set(ref(db, 'gallery/map/totalArtworks'), totalArtworks);
      // set(ref(db, 'gallery/map/'+ (totalArtworks - 1)), {
      //   generatedID
      // });

      // if (artworkName && artworkShortDescription && artworkLongDescription && artworkCompletionDate && materialsUsed && artworkPrice) {
        var artworkPictureURL = "https://firebasestorage.googleapis.com/v0/b/artpalmer-c1db0.appspot.com/o/artworks%2F" + generatedID+ ".jpg?alt=media";
        // Upload artwork details to database.
        set(ref(db, 'gallery/'+ (generatedID)), {
          "artworkName": artworkName,
          "artworkDescription": {
            "longDescription": artworkLongDescription
          },
          "artworkCompletionDate": artworkCompletionDate,
          "materialsUsed": materialsUsed,
          "artworkPrice": artworkPrice,
          "artworkPictureURL": artworkPictureURL,
          "artworkSize": artworkSize,
          "sold": sold,
          "digital": digital
        });
        uploadToCloud(generatedID)
        document.getElementById("sold").checked = false;
        document.getElementById("digital").checked = false;
        console.log(artworkName, artworkShortDescription, artworkLongDescription, artworkCompletionDate, materialsUsed)
      // } else {
      //   window.alert("Please fill in all the fields.")
      // }
  }).catch((error) => {
    console.error(error);
  });
});






//   // Get totalArtworks, this is used to generate the artwork ID.
//   get(child(dbRef, `gallery/map/totalArtworks`)).then((snapshot) => {
//     if (snapshot.exists()) {
//       window.alert("Artwork started uploading!")
//       totalArtworksDB = snapshot.val()
      
//       console.log(totalArtworksDB)
//       // Get artwork details from form.
//       var artworkName = document.getElementById("artworkName").value;
//       var artworkDescription = document.getElementById("artworkDescription").value;
//       var artworkCompletionDate = document.getElementById("artworkCompletionDate").value;
//       var materialsUsed = document.getElementById("materialsUsed").value;
//       var artworkPrice = document.getElementById("artworkPrice").value;
//       var artworkPictureURL = "https://firebasestorage.googleapis.com/v0/b/artpalmer-c1db0.appspot.com/o/artworks%2F" + (totalArtworksDB + 1) + ".jpg?alt=media"
//       // Upload artwork details to database.
//       set(ref(db, 'gallery/artwork'+ (totalArtworksDB + 1)), {
//         "artworkName": artworkName,
//         "artworkDescription": artworkDescription,
//         "artworkCompletionDate": artworkCompletionDate,
//         "materialsUsed": materialsUsed,
//         "artworkPrice": artworkPrice,
//         "artworkPictureURL": artworkPictureURL
//       });
      
//       console.log(artworkName, artworkDescription, artworkCompletionDate, materialsUsed)
    
//       // Update totalArtworks in database.
//       set(ref(db, 'gallery/map'), {
//         "totalArtworks": (totalArtworksDB + 1)
//       });
//       console.log("Update galler/ymap")
//       uploadToCloud(totalArtworksDB + 1)
//     } else {
//       console.warn("Error GETTING gallery/map/totalArtworks");
//     }
//   }).catch((error) => {
//     console.error(error);
//   });
// });
// When delete button is clicked.
deleteArtwork.addEventListener('click', e => {
  // Confirm deletion.
  if (confirm("Do you really want to delete your artworks PERMANENTLY?")) {
    remove(child(dbRef, '/gallery/'));
  };
    document.getElementById("alert-danger").style.display = "block";
    setTimeout(function(){ document.getElementById("alert-danger").style.display = "none"; }, 3000);
});