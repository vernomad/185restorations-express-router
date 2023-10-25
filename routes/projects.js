const express = require("express");
const router = express.Router();
const Project = require("../models/projects");
const fs = require("fs");
const path = require("path");
const { ROLE } = require("../config/roles");
const { authRole, checkUser } = require("../middleware/authMiddleware");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];
const handleErrors = require("../controllers/projectErrors");
const GalleryImages = require("../models/galleryImages");

router.get("/", async (req, res) => {
  let query = Project.find();

  if (req.query.name != null && req.query.name != "") {
    query = query.regex("name", new RegExp(req.query.name, "i"));
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    query = query.lte("publishDate", req.query.publishedBefore);
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
    query = query.gte("publishDate", req.query.publishedAfter);
  }
  try {
    const projects = await query.exec();
    const projectnavs = await Project.find().exec();
    res.render("projects", {
      project: projects,
      projectnavs: projectnavs,
      searchOptions: req.query,
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/:slug", async (req, res) => {
  const slug = req.params.slug;
  try {
    const project = await Project.findOne({ slug: slug });
    const projectnavs = await Project.find().exec();
    GalleryImages.find({ projectID: slug }, (err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        if (!project) {
          res.status(404).render("404");
        } else {
          res.render("projects/show", {
            project: project,
            projectnavs: projectnavs,
            items: items,
          });
        }
      }
    });
  } catch (err) {
    console.log(err, "From renderSlug");
  }
});
router.post(
  "/",
  async (req, res, next) => {
    req.project = new Project();
    next();
  },
  saveProjectAndRedirect("new")
);
router.put(
  "/edit/:id",
  async (req, res, next) => {
    req.project = await Project.findById(req.params.id);
    console.log("Your project has successfuly updated");

    next();
  },

  saveProjectAndRedirect("projects")
);
// router.get("/edit", async (req, res) => {
//   res.render("projects/edit");
// });
// router.get("/new", async (req, res) => {
//   res.render("projects/new");
// });
// router.get("/show", async (req, res) => {
//   res.render("projects/show");
// });

function saveProjectAndRedirect(path) {
  return async (req, res) => {
    let project = req.project;
    project.name = req.body.name;
    project.publishDate = new Date(req.body.publishDate);
    project.description = req.body.description;
    project.markdown = req.body.markdown;
    if (req.body.coverImage != null && req.body.coverImage != "") {
      saveCover(project, req.body.coverImage);
    }
    if (project.publishDate === undefined) {
      project.publishDate = new Date(Date.now());
    }
    try {
      await project.save();
      const projectRelated = req.project.slug;
      res.redirect(`/projects/${projectRelated}`);
      console.log("Project successfully saved!");
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
      console.log(errors);
    }
  };
}

function saveCover(project, coverImageEncoded) {
  if (coverImageEncoded == null) return;
  try {
    const cover = JSON.parse(coverImageEncoded);
    if (cover !== null && imageMimeTypes.includes(cover.type)) {
      project.coverImage = new Buffer.from(cover.data, "base64");
      project.coverImageType = cover.type;
    }
  } catch (err) {
    console.log(err);
    return;
  }
}

router.delete("/:slug", async (req, res) => {
  try {
    await GalleryImages.deleteMany({
      projectID: req.params.slug,
    });

    await Project.findOneAndDelete({ slug: req.params.slug });

    res.redirect("/admin/#projects-list");
    // res.render("/admin", {
    //   msg: "Project succesfully deleted!",
    // });
  } catch (err) {
    console.log(err, "Error deleting Gallery and Project");
  }
});

router.delete(
  "/gallery/:slug",
  checkUser,
  authRole(ROLE.ADMIN),
  async (req, res) => {
    try {
      await GalleryImages.deleteMany({
        projectID: req.params.slug,
      });

      res.redirect("/admin/#projects-list");
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
