const mongoose = require("mongoose");
const imageBasePath = "./public/uploads";
const galleryImagesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    projectID: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      required: true,
    },
    img: {
      data: Buffer,
      contentType: String,
      //virtuals: true,
    },
    // img: {
    //   type: Array,
    //   //virtuals: true,
    // },
  },
  {
    timestamps: true,
  }
);
// galleryImagesSchema.virtual("imgPath").get(function () {
//   if (this.imgPath != null) {
//     return `${this.imgPath}`.split(",");
//   }
// });

galleryImagesSchema.virtual("imgPath").get(function () {
  if (this.img != null) {
    var img = this.img;
    for (let i = 0; i < img.length; i++) {
      console.log(this.img, "lsdkjfj");
      return `${this.img}`.split(",");
    }
  }
});

const GalleryImages = mongoose.model("GalleryImages", galleryImagesSchema);
module.exports = GalleryImages;
module.exports.imageBasePath = imageBasePath;
