const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const GalleryImages = require("../models/galleryImages");
const { checkUser } = require("../middleware/authMiddleware");

const maxSize = 2 * 1024 * 1024;

var storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { filesize: maxSize },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "images") {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.fieldname}-${Date.now()}.${ext}-${file.originalname}`);
    }
  },
}).array("images", 30);

//Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;

  //Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.get("/", (req, res) => {
  res.send("upload get page");
});

router.post("/:slug", async (req, res) => {
  const slug = req.params.slug;
  try {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
        res.render(`admin/${slug}`, {
          msg: err,
        });
      } else {
        if (req.files == undefined) {
          res.render("admin", {
            msg: "Error: No File Selected!",
          });
        } else {
          Promise.all(
            req.files.map(async (file) => {
              const gallery = new GalleryImages({
                name: file.originalname,
                projectID: req.params.slug,
                //img: file.path,
                img: {
                  data: file.buffer,
                  //data: fs.readFileSync(path.join("public", file.filename)),
                  contentType: "image/jpg",
                },
              });
              // console.log(req.files);
              await gallery.save();
            })
          );
          res.redirect(`/projects/${slug}`);
        }
      }
    });
  } catch (err) {
    res.render(`admin/${slug}`, {
      msg: err,
    });
    console.log(err, "THE IMPORTANT INFOMATION");
  }
});

module.exports = router;
