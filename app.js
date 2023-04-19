const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const imageInput = document.getElementById("picture");
const text = document.getElementById("text");
//const sliderOne = document.getElementById("myRange")
const createButton = document.getElementById("download-button")
const fontSizeSlider = document.getElementById("font-size")
const sliderTwo = document.getElementById("myRange2")
//const rotateSlider = document.getElementById("rotate")
const opacitySlider = document.getElementById("opacity")
// const fontSize = document.getElementById("font-size-input").value;
 
// When a new image is selected, load it into the canvas


const WaterMark = () => {
    let fontSize = fontSizeSlider.value;
    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
    const image = new Image();
    image.onload = function() {
      // Draw the image on the canvas
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set the canvas dimensions to match the image dimensions
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw the image on the canvas
  ctx.drawImage(image, 0, 0);
      
    //   fontSize = image.height / 15;
      // Set the text style
      let rotate = rotateSlider.value;
      let opacity = opacitySlider.value/10;

      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.rotate(rotate * Math.PI / 180);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Draw the repeating text watermark
       // Draw the repeating text watermark
       //let sliderOneValue = sliderOne.value;
       let sliderTwoValue = sliderTwo.value;
       const xStep = canvas.width / (canvas.width/canvas.height * sliderTwoValue);
       const yStep = canvas.height / (canvas.width/canvas.height * sliderTwoValue);
       let xStart = -canvas.width;
       let yStart = -canvas.height / 3;
       const xEnd = canvas.width * 3;
       const yEnd = canvas.height * 3;
      
      
      for (let x = xStart; x < xEnd; x += xStep) {

        // xStart = -canvas.width / (6 + Math.floor(Math.random() * 5));
        for (let y = yStart; y < yEnd; y += yStep) {
          ctx.fillText(text.value, x, y);
          ctx.strokeStyle = "black";
          ctx.lineWidth = 0.2;
          ctx.strokeText(text.value, x, y);
        }
      }
      
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
}



 

//sliderOne.addEventListener("change", function() {
//    WaterMark();
//})

fontSizeSlider.addEventListener("change", function() {
    WaterMark();
})

sliderTwo.addEventListener("change", function() {
    WaterMark();
})

imageInput.addEventListener("change", function() {
    WaterMark();
})

text.addEventListener("input", function() {
    WaterMark();
})

//rotateSlider.addEventListener("change", function() {
//    WaterMark();
//})

opacitySlider.addEventListener("change", function() {
    WaterMark();
})

const downloadImage = () => {
        // Convert the canvas to a data URL and create a new anchor element with the URL
        const dataURL = canvas.toDataURL("image/jpeg");
        const downloadLink = document.createElement("a");
        downloadLink.href = dataURL;
        downloadLink.download = "watermarked-image.jpg";
      
        // Simulate a click on the anchor element to trigger the download
        downloadLink.click();
}

createButton.addEventListener("click", () => {
    downloadImage();
  });

  (function() {

    "use strict";
    
    canvas.addEventListener( "contextmenu", function(e) {
        event.preventDefault();
        downloadImage();
        
    });

    canvas.addEventListener( "click", function(e) {
        event.preventDefault();
        downloadImage();
        
    });
    
    })();
