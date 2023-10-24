//Admin
const express = require("express");
const router = express.Router();
const Project = require("../models/projects");
const GalleryImages = require("../models/galleryImages");
const { ROLE } = require("../config/roles");
const { authRole, checkUser } = require("../middleware/authMiddleware");

router.get("/", authRole(ROLE.ADMIN), async (req, res) => {
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
    const project = await query.limit(100).exec();
    res.render("admin", {
      project: project,
      searchOptions: req.query,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/edit/:slug", async (req, res) => {
  const slug = req.params.slug;
  try {
    const project = await Project.findOne({ slug: slug });
    if (!project) {
      res.status(404).render("404");
    } else {
      res.render("admin/edit", {
        project: project,
      });
    }
  } catch (err) {
    console.log(err, "From Edit Slug");
    render("admin", {
      msg: err,
    });
  }
});

router.get("/new", async (req, res) => {
  res.render("admin/new");
});

router.get("/show", async (req, res) => {
  res.render("admin/show");
});

router.get("/:slug", async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) {
    res.status(404).render("404");
  } else {
    res.render("admin/image-upload", {
      project: project,
    });
  }
});

router.delete("/:id", checkUser, authRole(ROLE.ADMIN), async (req, res) => {
  const slug = req.body.hidden;
  try {
    await GalleryImages.deleteOne({ _id: req.params.id });

    res.redirect(`/projects/${slug}`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
