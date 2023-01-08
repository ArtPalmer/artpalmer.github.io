import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


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
var totalArtworksDB = []



// function getArtworkIndividualRequests(){
//   get(child(dbRef, `gallery/map/totalArtworks`)).then((snapshot) => {
//     if (snapshot.exists()) {
//       totalArtworksDB = snapshot.val()
//       console.log(totalArtworksDB)


//       var i = 0
//       while (i < totalArtworksDB){

//           var galleryArtworkURL = ("gallery/artwork" + (i + 1))

//           get(child(dbRef, galleryArtworkURL)).then((snapshot) => {
//             if (snapshot.exists()) {
//               var artworkData = snapshot.val()

//               console.log(artworkData)
//             }else{
//               console.log("error")
//             }

//           }).catch((error) => {console.error(error);});
//         i++
//       }
        
// }
//   }).catch((error) => {
//     console.error(error);
//   });

// }

function getArtworkOneRequest(){
  get(child(dbRef, '/gallery/')).then((snapshot) => {

    if (snapshot.exists()){
      var i = 0
      var artworkData = snapshot.val()
      console.log(artworkData)
      console.log("Total Artworks - " + artworkData["map"]["totalArtworks"])
      if (artworkData["map"]["totalArtworks"] >= 1){
        while (i < artworkData["map"]["totalArtworks"]){
          // artwork
          const artworkContainerartwork = document.createElement("artwork");
          artworkContainerartwork.setAttribute('id', "artwork" + (i+1) + "Container");
          var artworkID = "artwork" + (i+1) + "Container";
          document.body.appendChild(artworkContainerartwork)
  
          // Text Element
          var artworkNum = "artwork" + (i+1)
          const displayArtwork = document.createElement("p");
          
          var artworkName = artworkData[artworkNum]["artworkName"]
          var artworkDescription = artworkData[artworkNum]["artworkDescription"]
          var artworkCompletionDate = artworkData[artworkNum]["artworkCompletionDate"]
          var materialsUsed = artworkData[artworkNum]["materialsUsed"]
          var artworkPictureURL = artworkData[artworkNum]["artworkPictureURL"]
          var displayArtworkText = document.createTextNode((i+1) + "." + " Artwork Name - " + artworkName + ", Artwork Description - " + artworkDescription + ", Artwork Completion Date - " + artworkCompletionDate + ", Materials Used - " + materialsUsed + ", Artwork Picture URL - ", artworkPictureURL);
          displayArtwork.appendChild(displayArtworkText)
          console.log(displayArtwork)
          document.getElementById(artworkID).appendChild(displayArtwork);
          document.getElementById(artworkID).style.fontSize = "10px"
          i++
        }
      }else{
        window.alert("There are no artworks in the database.")
      }

    }
  }).catch((error) => {console.error(error);});
}
getArtworkOneRequest()
