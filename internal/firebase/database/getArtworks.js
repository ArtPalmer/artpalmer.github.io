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
function getArtworkOneRequest(){
  get(child(dbRef, '/gallery/')).then((snapshot) => {

    if (snapshot.exists()){
      document.getElementById("loader").remove();
      var i = 0
      var artworkData = snapshot.val()
      console.log(artworkData)
      console.log("Total Artworks - " + artworkData["map"]["totalArtworks"])
      if (artworkData["map"]["totalArtworks"] >= 1){
        while (i < artworkData["map"]["totalArtworks"]){
          // artwork
          var artworkID = "artwork" + (i+1) + "Container";

          var artworkNum = ("artwork" + (i+1))

          var artworkName = artworkData[artworkNum]["artworkName"]
          var artworkDescription = artworkData[artworkNum]["artworkDescription"]
          var artworkCompletionDate = artworkData[artworkNum]["artworkCompletionDate"]
          var artworkPrice = artworkData[artworkNum]["artworkPrice"]
          var materialsUsed = artworkData[artworkNum]["materialsUsed"]
          var artworkPictureURL = artworkData[artworkNum]["artworkPictureURL"]
          document.getElementById("artworks").insertAdjacentHTML('afterbegin', '<div id="' + "artwork" + (i+1) + "Container" + '" <div class="artworkContainer"><img src="' + artworkPictureURL + '" class="artworkImage"><div class="artworkPriceCompletionContainer"><span class="artworkPrice">£' + artworkPrice + '</span><div class="informationSeperator"></div><span class="compleationDate">'+ artworkCompletionDate +'</span></div><div class="artworkCategoryContainer"><div class="categoryBox"></div><span class="categoryLabel">Category</span></div><div class="artworkInformationContainer"><span class="artworkDescription">'+ artworkDescription +'</span><span class="artworkName">' + artworkName +'</span></div></div></div></div>')
          i++
        }
      }else{
        window.alert("There are no artworks in the database.")
      }

    }
  }).catch((error) => {console.error(error);});
}
getArtworkOneRequest()
