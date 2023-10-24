const User = require("../models/Users");
const { ROLE } = require("../config/roles");

const handleErrors = require("./adminErrors");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

const getAllUsers = async (req, res) => {
  console.log("getAllUsers");
  let searchOptions = {};
  if (req.query.username != null && req.query.username !== "") {
    searchOptions.username = new RegExp(req.query.username, "i");
  }
  try {
    const users = await User.find(searchOptions);
    res.render("admin", {
      users: users,
      searchOptions: req.query,
    });
  } catch (err) {
    res.redirect("/admin");
  }
  // res.send("Show User" + req.params.id);
};

const getNewUsers = async (req, res) => {
  console.log("Add New Users");
  res.render("admin/new", { author: new User() });
};

const postNewUsers = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    role: {
      ROLE: {
        USER: ROLE.USER,
      },
    },
    password: req.body.password,
  });
  console.log("POST New Users");
  if (req.body.avatar !== null && req.body.avatar !== "") {
    saveAvatar(user, req.body.avatar);
  }
  try {
    const newUser = await user.save();
    console.log(newUser);
    res.redirect(`/admin/${user.username}`);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(401).json(errors);
    console.log(errors);
  }
};

const getUser = async (req, res) => {
  console.log("getUser");
  try {
    //const user = await User.findById(req.params.id);
    res.render("admin/show", {
      //user: user,
    });
  } catch (err) {
    res.redirect("/admin");
  }
};

const editUser = async (req, res) => {
  console.log("editUser");
  try {
    const user = await User.findById(req.params.id);
    res.render("admin/edit", { user: user });
  } catch (err) {
    res.redirect("/admin");
  }
};

const updateUser = async (req, res) => {
  console.log("updateUser");
  let user;
  try {
    user = await User.findById(req.params.id);
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.description = req.body.description || user.description;
    if (req.body.avatar != null && req.body.avatar !== "") {
      saveAvatar(user, req.body.avatar);
    }
    await user.save();
    res.redirect(`/admin/${user.id}`);
  } catch (err) {
    if (user == null) {
      res.redirect("/admin");
    } else {
      res.render("admin/edit", {
        user: user,
        errorMessage: "Error updating User",
      });
    }
  }
};

const deleteUser = async (req, res) => {
  let ID = req.params.id;
  let user;
  try {
    user = await User.findById(ID);
    await user.remove();
    res.redirect("/admin");
  } catch (err) {
    if (user == null) {
      res.redirect("/admin");
    } else {
      res.redirect(`/admin/${user.id}`);
    }
  }
};

function saveAvatar(user, avatarEncoded) {
  if (avatarEncoded === null) return;
  const avatar = JSON.parse(avatarEncoded);
  if (avatar !== null && imageMimeTypes.includes(avatar.type)) {
    user.avatarImage = new Buffer.from(avatar.data, "base64");
    user.avatarImageType = avatar.type;
  }
}
module.exports = {
  getAllUsers,
  getNewUsers,
  postNewUsers,
  updateUser,
  deleteUser,
  editUser,
  getUser,
};
