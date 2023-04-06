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
  get(child(dbRef, 'gallery/')).then((snapshot) => {

    if (snapshot.exists()){ 
       var galleryData = snapshot.val();
       // Get all the keys in the object#


        var keys = Object.keys(galleryData);
        var artworks = keys.length;

        // Get the details of the next person

        console.log(artworks)
        var i = 0;
        while (i < artworks){
          var artwork = galleryData[keys[i]];
          // console.log(artwork)
          var artworkName = artwork["artworkName"];
          var artworkDescription = artwork["artworkDescription"];
          var artworkCompletionDate = artwork["artworkCompletionDate"];
          var artworkPrice = artwork["artworkPrice"];
          var materialsUsed = artwork["materialsUsed"];
          var artworkPictureURL = artwork["artworkPictureURL"];

          i++
        }
    }
  })
}
//       var i = 0
//       var artworkData = snapshot.val()
//       console.log(artworkData)
//       console.log("Total Artworks - " + artworkData["map"]["totalArtworks"])
//       if (artworkData["map"]["totalArtworks"] >= 1){
//         while (i < artworkData["map"]["totalArtworks"]){
//           // artwork
//           var artworkID = "artwork" + (i+1) + "Container";

//           var artworkNum = ("artwork" + (i+1))

//           var artworkName = artworkData[artworkNum]["artworkName"]
//           var artworkDescription = artworkData[artworkNum]["artworkDescription"]
//           var artworkCompletionDate = artworkData[artworkNum]["artworkCompletionDate"]
//           var artworkPrice = artworkData[artworkNum]["artworkPrice"]
//           var materialsUsed = artworkData[artworkNum]["materialsUsed"]
//           var artworkPictureURL = artworkData[artworkNum]["artworkPictureURL"]
//           document.getElementById("artworks").insertAdjacentHTML('afterbegin', '<div id="' + "artwork" + (i+1) + "Container" + '" <div class="artworkContainer"><img src="' + artworkPictureURL + '" class="artworkImage"><div class="artworkPriceCompletionContainer"><span class="artworkPrice">£' + artworkPrice + '</span><div class="informationSeperator"></div><span class="compleationDate">'+ artworkCompletionDate +'</span></div><div class="artworkCategoryContainer"><div class="categoryBox"></div><span class="categoryLabel">Category</span></div><div class="artworkInformationContainer"><span class="artworkDescription">'+ artworkDescription +'</span><span class="artworkName">' + artworkName +'</span></div></div></div></div>')
//           i++
//         }
//       }else{
//         window.alert("There are no artworks in the database.")
//       }
//       var artworksData = snapshot.val();
//       var totalArtworks = artworksData["map"]["totalArtworks"];
//       // Get the first enquiry from the json


//       console.log(totalArtworks);
      

//       if (totalArtworks >= 1){
//               // while (i < totalEnquiries){
//               //         var internalDataDisplayCode = '<a style="display: block;">' + enquiriesData + '</a>';
//               //         console.log(enquiriesData[i]);
//               //         document.getElementById("internal_data_display").insertAdjacentHTML('afterbegin', internalDataDisplayCode);
//               //         i++
//               // }
//               for(var i = 0; i < totalArtworks; i++)
//               {
//                       var artworks = artworksData["map"][i]["generatedID"];
//                       console.log((i + 1) + " " + artworks);
//                       var artworksName = artworksData[artworks]["artworkName"];
//                       console.log(artworksName);
//                       var internalDataDisplayCode = '<a href="/portal/enquiries/get/?id=' + artworks + '" style="display: block;">' + artworksName + ' - ' + artworks + '</a>';
//                       document.getElementById("internal_data_display").insertAdjacentHTML('afterbegin', internalDataDisplayCode);
//               }

//             }
//             else{
//               window.alert("There are no artworks in the database.")
//             }
//     }else{
//       window.alert("There are no artworks in the database.")
//     }
//   }).catch((error) => {console.error(error);});
// }
getArtworkOneRequest()
