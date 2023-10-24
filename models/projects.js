const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

// const slug = req.params.slug;
const projectBasePath = `./public/uploads/`;
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      minlength: [4, "Minimum characters for title is 5"],
      maxlength: [20, "Max characters for title is 30"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please enter a description of project"],
      minlength: [4, "Minimum characters for description is 8"],
      maxlength: [20, "Max characters for description is 230"],
    },
    markdown: {
      type: String,
      //required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    sanitizedHtml: {
      type: String,
    },
    publishDate: {
      type: Date,
      required: true,
    },
    coverImage: {
      type: Buffer,
      required: [true, "A cover image is required"],
    },
    coverImageType: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

projectSchema.pre("validate", async function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked.marked(this.markdown));
  }
  next();
});

projectSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${
      this.coverImageType
    };charset=utf-8;base64,${this.coverImage.toString("base64")}`;
  }
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
module.exports.projectBasePath = projectBasePath;
