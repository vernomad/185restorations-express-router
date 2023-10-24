// var images = document.getElementById("image2");
// var index = 0;

// function buildImage() {
//   var img = document.createElement("img");
//   img.src = images[index];
//   document.getElementById("content").appendChild(img);
// }

// function changeImage() {
//   var img = document.getElementById("content").getElementsByTagName("img")[0];
//   index++;
//   index = index % images.length; // This is for if this is the last image then goto first image
//   img.src = images[index];
// }

// function getBase64Image(img) {
//   var canvas = document.createElement("canvas");
//   width = 200;
//   height = 100;
//   canvas.width = img.width;
//   canvas.height = img.height;
//   var ctx = canvas.getContext("2d");
//   ctx.drawImage(img, 0, 0);
//   return canvas.toDataURL("image/jpg");
//   }
//   var images = document.getElementById('image2');
//   var tpArray = [];
//   for (var i = 0; i < images.length; i++) { var img=new Image(); (function (img) { img.onload=function
//       () { document.body.innerHTML +='<img src="' + getBase64Image(img) + '">' ; }; })(img);
//       img.src=images[i]; } console.log(document.body.innerHTML); const
//       data=document.getElementById('image2'); const image=Object.keys(data).map(key=>
//       data[key][`name${Number(key)+1}`])

//   console.log(image, "FROM CONSOLE");
//var imgArray = new Array();

var gallery = document.getElementById("image2");
for (i = 0; i < gallery.length; i++) {
  gallery.split(",")[0].appendChild(gallery[i]);
}

imgArray[0] = new Image();
imgArray[0].src = "gallery";

imgArray[1] = new Image();
imgArray[1].src = "gallery";

imgArray[2] = new Image();
imgArray[2].src = "gallery";

imgArray[3] = new Image();
imgArray[3].src = "gallery";

imgArray[4] = new Image();
imgArray[4].src = "gallery";
