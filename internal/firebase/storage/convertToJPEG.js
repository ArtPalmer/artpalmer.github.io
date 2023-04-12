import { uploadToCloud } from 'internal/firebase/storage/uploadToCloud.js';
// Add event listener for when a file is selected
export function convert(generatedID, file){
  // Get the selected file

  // Create a FileReader to read the file as data URL
  var reader = new FileReader();

  // Set the onload event handler for when the file is loaded
  reader.onload = function() {
    // Create an Image element
    var img = new Image();

    // Set the source of the image to the loaded data URL
    img.src = reader.result;

    // Wait for the image to load
    img.onload = function() {
      // Create a canvas element
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      // Set the canvas dimensions to match the image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);

      // Convert the canvas image to JPEG data URL
      var jpegDataUrl = canvas.toDataURL('image/jpeg');

      // Create a link element to download the converted JPEG image
        uploadToCloud(generatedID)
    };
  };

  // Read the file as data URL
  reader.readAsDataURL(file);
};