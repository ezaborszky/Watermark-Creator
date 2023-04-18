const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const imageInput = document.getElementById("picture");
const text = document.getElementById("text").value;
const sliderOne = document.getElementById("myRange")
const createButton = document.getElementById("watermark-button")
const fontSizeSlider = document.getElementById("font-size")
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
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.rotate(-45 * Math.PI / 180);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Draw the repeating text watermark
       // Draw the repeating text watermark
       let sliderOneValue = sliderOne.value;
       const xStep = canvas.width / (canvas.width/canvas.height *2);
       const yStep = canvas.height / (canvas.width/canvas.height *3);
       let xStart = -canvas.width / sliderOneValue;
       let yStart = -canvas.height / 3;
       const xEnd = canvas.width * 3;
       const yEnd = canvas.height * 3;
      
      
      for (let x = xStart; x < xEnd; x += xStep) {

        // xStart = -canvas.width / (6 + Math.floor(Math.random() * 5));
        for (let y = yStart; y < yEnd; y += yStep) {
          ctx.fillText(text, x, y);
          ctx.strokeStyle = "black";
          ctx.lineWidth = 0.2;
          ctx.strokeText(text, x, y);
        }
      }
      
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
}



createButton.addEventListener("click", function() {
    WaterMark();  
});

sliderOne.addEventListener("change", function() {
    WaterMark();
})

fontSizeSlider.addEventListener("change", function() {
    WaterMark();
})