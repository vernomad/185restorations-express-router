const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    name: "",
    // publishDate: "",
    coverImage: "",
    description: "",
    imageGallery: "",
  };

  //incorrect title
  if (err.message === "incorrect name") {
    errors.name = "The name needs to be between 5 and 25 characters long";
  }
  // //incorrect publish
  // if (err.message === "incorrect publishDate") {
  //   errors.publishDate = "Publish-date is a required field";
  // }
  //incorrect coverImage
  if (err.message === "incorrect coverImage") {
    errors.coverImage = "Thumbnail image is required";
  }
  // incorrect email
  if (err.message === "incorrect description") {
    errors.description =
      "The description needs to between 8 and 130 characters long";
  }
  if (err.message === "incorrect imageGallery") {
    errors.imageGallery = "Something has gone wrong with images";
  }
  //Duplicate error
  if (err.code === 11000) {
    errors.name = "This exact title already exist!";
    return errors;
  }
  //Validate errors
  if (err.message.includes("Project validation failed:")) {
    Object.values(err.errors).forEach(({ properties }) => {
      //console.log(values);
      console.log(properties, "From Validation Eroooorw");
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = handleErrors;
