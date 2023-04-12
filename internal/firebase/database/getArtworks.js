import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, get, ref, child, orderByChild } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


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
const galleryRef = ref(getDatabase(), 'gallery/');
// function reformatDate(date, generatedID){
//   var dateLength = date.length
//   var currentDate = new Date();
//   var currentYear = currentDate.getFullYear().toString();
//   var currentYearStart = currentYear.slice(0,2);
//   console.log(currentYear)
//   // dateLength = dateLength - 2; //Compenstate for the 2 characters that are not part of the date
//   if (dateLength == 8){
//     // 00/00/00 or 0/0/0000
//     // check if 2nd character is a /
//     if (date.charAt(2) == "."){
//       var date_day = date.slice(0,2);
//       var date_month = date.slice(3,5);
//       var date_year = date.slice(6,8);
//       var reformatedDateVar = currentYearStart + date_year + "/" + date_month + "/" + date_day;
//       console.log("00/00/00", reformatedDateVar)
//     }else{
//       var date_day = date.slice(0,2);
//       var date_month = date.slice(3,5);
//       var date_year = date.slice(3, 5);
//       var reformatedDateVar = currentYearStart + date_year + "/" + date_month + "/" + date_day;
//       console.log(reformatedDateVar, date)
//       // 0/0/0000

//     }
//   } else if (dateLength == 10){
//     var date_day = date.slice(0,2);
//     var date_month = date.slice(3,5);
//     var date_year = date.slice(6,10);
//     var reformatedDateVar = date_year + "/" + date_month + "/" + date_day;
//     // 00/00/0000
//   } else if (dateLength == 8){
//     var date_day = date.slice(0,2);
//     var date_month = date.slice(3,5);
//     var date_year = date.slice(6,8);
//     var reformatedDateVar = currentYearStart + date_year + "/" + date_month + "/" + date_day;
//     console.log("00/00/00", date, reformatDateVar)
//     // 0/0/00
//   }else if(dateLength == 6){
//     var date_day = date.slice(0,1);
//     var date_month = date.slice(2,3);
//     var date_year = date.slice(4,6);
//     var reformatedDateVar = currentYearStart + date_year + "/" + date_month + "/" + date_day;
//     console.log(reformatedDateVar, date)
//     // 0/0/0000
//   }
//   return `${reformatedDateVar}`;
// }
// function custom_sort(a, b) {
//   return new Date(a.artworkCompletionDate.getTime()) - new Date(b.artworkCompletionDate).getTime();
// }
// var your_array = [
//   {lastUpdated: "2010/01/01"},
//   {lastUpdated: "2009/01/01"},
// //   {lastUpdated: "2010/07/01"}
// // ];
// function order() {
//   galleryRef.orderByChild("date").on("value", function(snapshot) {
//     snapshot.forEach(snap => {
//       const issue = snap.val();
//       console.log(issue);
//   // More code but we don't need to see it here
//     });
//   });
// }
function getArtworkOneRequest(){
  get(child(dbRef, 'gallery/')).then((snapshot) => {

    if (snapshot.exists()){ 
       var galleryData = snapshot.val();



        var keys = Object.keys(galleryData).reverse();
        var artworks = keys.length;

        // Get the details of the next person

        console.log(artworks)
        var i = 0;
        while (i < artworks){
          try{
            var artwork = galleryData[keys[i]];
            var artworkCompletionDate = artwork["artworkCompletionDate"].split(9,16);
            // galleryData.sort(custom_sort);
            artworkCompletionDate = artwork["artworkCompletionDate"]
            galleryData.sort
            var artworkPictureURL = artwork["artworkPictureURL"];
              console.log(`i = ${i} Artwork - ${artworkPictureURL}`)
              document.getElementById("gallery_container").insertAdjacentHTML('beforeend', `
              <div class="gallery_artwork_wrapper">
                <a href="/artwork/?id=${keys[i]}">
                  <img id="${i}" class="gallery_artwork_image" src="${artworkPictureURL}">
                </a>
            </div>`);
            var img = document.getElementById(i);
            var width = img.naturalWidth;
            var height = img.naturalHeight;
            
            if (width > height) {
              img.setAttribute('id', 'landscape');
              img.setAttribute('class', 'gallery_artwork_image');
            } else {
              img.setAttribute('id', 'portrait')
              img.setAttribute('class', 'gallery_artwork_image');
            }
            i++
          } catch (error) {
            i++
            console.log(error)
          }

        }
    }else {
      console.log("No data available");
      document.getElementById("gallery_container").insertAdjacentHTML('beforeend', `<h1 class="error">Internal server error. <a href="mailto:austin@artpalmer.com">Please contact developer.</a></h1> `);
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
getArtworkOneRequest();
