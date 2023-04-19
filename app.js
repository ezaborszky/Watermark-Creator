const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const imageInput = document.getElementById("picture");
const text = document.getElementById("text");
// const sliderOne = document.getElementById("myRange")
const createButton = document.getElementById("download-button")
const fontSizeSlider = document.getElementById("font-size")
const sliderTwo = document.getElementById("myRange2")
//const rotateSlider = document.getElementById("rotate")
const opacitySlider = document.getElementById("opacity")
// const fontSize = document.getElementById("font-size-input").value;
 
// When a new image is selected, load it into the canvas


const WaterMark = () => {
   

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
  let diagonal = Math.sqrt((image.height*image.height)+(image.width*image.width));
  // Draw the image on the canvas
    ctx.drawImage(image, 0, 0);
    let textLengthModifier = fontSizeSlider.value;
    let textLength = 3.5 * ((text.value).length);
    let fontSize = (Math.trunc(Number(diagonal / textLength)) + Number(textLengthModifier));
    console.log(textLengthModifier);
    console.log(fontSize)
    //let fontSize = fontSizeSlider.value;
    
      // Set the text style
      //let rotate = rotateSlider.value;
      let opacity = opacitySlider.value/10;

      ctx.font = `small-caps ${fontSize}px Arial`;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.rotate(-50 * Math.PI / 180);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      

     
      
      // Draw the repeating text watermark
       // Draw the repeating text watermark
      //  let sliderOneValue = sliderOne.value;
       let sliderTwoValue = sliderTwo.value;
       const xStep = diagonal/4.5;
       const yStep = canvas.height / (sliderTwoValue);
       let xStart = -canvas.width / (canvas.width/diagonal);
       let yStart = -canvas.height / (canvas.height/diagonal);
       const xEnd = canvas.width * 3;
       const yEnd = canvas.height * 3;
      
      
      for (let x = xStart; x < xEnd; x += xStep) {

        // xStart  = xStart - (xStart/10)
        for (let y = yStart; y < yEnd; y += yStep) {
           
          ctx.fillText(text.value, x, y);
          ctx.strokeStyle = "grey";
          ctx.lineWidth = 0.3;
          ctx.strokeText(text.value, x, y);
        }
      }
      
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
}



 

// sliderOne.addEventListener("change", function() {
//     WaterMark();
// })

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

// rotateSlider.addEventListener("change", function() {
//     WaterMark();
// })

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