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

const querys = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop),});
let queryValue = querys.id;

function isSoldTrue(artworkSold){
  if (artworkSold == true){
    return " • Sold";
  }else if (artworkSold == false){
    return " • For Sale";
  }else{
    return " • Internal server error. Please contact the developer.";
  }

}
function checkArtworkSize(artworkSize){
  if (artworkSize){
    return ` • ${artworkSize}`;
  }else{
    return "";
  }
}
function checkDigital(digital){
  console.log(digital);
  if (digital == true){
    return ` • Digital`;
  }else{
    return "";
  }
}
get(child(dbRef, 'gallery/' + queryValue)).then((snapshot) => {
  if (snapshot.exists()) {
    var data = snapshot.val();
    var artworkName = data.artworkName;
    var artworkPrice = data.artworkPrice;
    if (artworkPrice % 1 != 0) {
      artworkPrice = `£${artworkPrice}`
    }else if (artworkPrice % 1 == 0) {
      artworkPrice = `£${artworkPrice}.00`
    }
    var artworkCompletionDate = data.artworkCompletionDate;
    artworkCompletionDate = artworkCompletionDate.replace(/\//g, '.');
    artworkCompletionDate = artworkCompletionDate.replace(/-/g, '.');
    var artworkDescription = data.artworkDescription.longDescription;
    var artowrkMaterials = data.materialsUsed;
    var artworkSize = data.artworkSize;
    var artworkImageURL = data.artworkPictureURL;
    var artworkSold = data.sold;
    var digital = data.digital;

    document.getElementById("single_artwork_container").innerHTML = `
    <img class="single_artwork_image" id="artworkImage" src="${artworkImageURL}">
    <h1 class="single_artwork_name">${artworkName}</h1>
    <div>
    <p class="single_artwork_price_date">${artworkPrice} • ${artworkCompletionDate}${checkArtworkSize(artworkSize)}${isSoldTrue(artworkSold)}${checkDigital(digital)}</p>
    <p class="single_artwork_materials">${artowrkMaterials}</p>
    <p class="single_artwork_description">${artworkDescription}</p>
    </div>`;

  var img = document.getElementById("artworkImage");
  var width = img.naturalWidth;
  var height = img.naturalHeight;
  
  if (width > height) {
    img.setAttribute('id', 'landscape');
  } else {
    img.setAttribute('id', 'portrait')
  }
    console.log(artworkName, artworkPrice, artworkCompletionDate, artworkDescription, artowrkMaterials, artworkImageURL, artworkSold);
  } else {
    document.getElementById("single_artwork_container").innerHTML = `
    <h1 class="single_artwork_name">Artwork not found</h1>`
  }
}).catch((error) => {
  console.error(error);
  document.getElementById("single_artwork_container").innerHTML = `
  <h1 class="single_artwork_name">Artwork not found</h1>`
});