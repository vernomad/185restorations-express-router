const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    adminName: "",
    coverImage: "",
    password: "",
  };
  //incorrect username
  if (err.message === "incorrect adminName") {
    errors.adminName = "Admin name is incorrect";
  }
  //incorrect coverImage
  if (err.message === "incorrect coverImage") {
    errors.coverImage = "Thumbnail image is required";
  }

  //Duplicate error
  if (err.code === 11000) {
    errors.adminName = "That name is already registered, try adding 007";
    return errors;
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  //Validate errors
  if (err.message.includes("admin validation failed:")) {
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      console.log(properties, "From Validation Eroors");
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = handleErrors;
