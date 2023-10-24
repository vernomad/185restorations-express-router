const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const { ROLE } = require("../config/roles");

const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    username: "",
    avatarImage: "",
    //email: "",
    password: "",
  };

  //incorrect username
  if (err.message === "incorrect username") {
    errors.username = "Username is incorrect";
  }

  //Duplicate error
  if (err.code === 11000) {
    errors.username = "That name is already registered, try adding 007!";
    return errors;
  }

  //incorrect avatar
  if (err.message === "incorrect avatar") {
    errors.avatarImage = "No detected avatar";
  }

  // incorrect email
  // if (err.message === "incorrect email") {
  //   errors.email = "That email is not registered";
  // }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  //Duplicate error
  // if (err.code === 11000) {
  //   errors.email = "that email is already registered";
  //   return errors;
  // }

  //Validate errors
  if (err.message.includes("User validation failed:")) {
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      console.log(properties, "From Validation Eroors");
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 4 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

// module.exports.login_get = (req, res) => {
//   res.render("login");
// };

// module.exports.register_get = (req, res) => {
//   res.render("register");
// };

module.exports.register_post = async (req, res) => {
  const user = new User({
    username: req.body.username,
    //email: req.body.email,
    role: {
      ROLE: {
        USER: ROLE.ADMIN,
      },
    },
    password: req.body.password,
  });
  if (req.body.avatarImage !== null && req.body.avatarImage !== " ") {
    saveAvatar(user, req.body.avatarImage);
  }
  try {
    const newUser = await user.save();
    const token = createToken(user._id, user.username, user.role);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    console.log(`${user.username}`, "has just registered!");
    res.status(200).json({ newUser });
    //res.redirect("/admin");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
    console.log(err);
  }
};

module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id, user.username, user.role);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "Strict",
      secrure: true,
    });
    const loggedIn = { user: user.username };
    console.log(loggedIn, "Has just logged in!");
    res.status(200).json({ user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
    console.log(err);
  }
};

// module.exports.update_patch = async (req, res) => {
//   const ID = req.body.user;
//   let user;
//   try {
//     user = await User.findById(ID);
//     user.username = req.body.username || user.username;
//     user.email = req.body.email || user.email;
//     user.description = req.body.description || user.description;
//     if (req.body.avatarImage != null && req.body.avatarImage !== "") {
//       saveAvatar(user, req.body.avatarImage);
//     }
//     await user.save();
//     res.redirect("profile/settings");
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports.logout_get = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

function saveAvatar(user, avatarImageEncoded) {
  if (avatarImageEncoded === null) return;
  try {
    const avatar = JSON.parse(avatarImageEncoded);
    if (avatar !== null && imageMimeTypes.includes(avatar.type)) {
      user.avatarImage = new Buffer.from(avatar.data, "base64");
      user.avatarImageType = avatar.type;
    }
  } catch (err) {
    console.log(err);
    return;
  }
}
