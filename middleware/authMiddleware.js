const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //Chec json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

function setUser(req, res, next) {
  const user = res.locals.user;
  if (user == null) {
    console.log("SetUser says No user signed in!");
    // next();
  }
  const userId = res.locals.user.id;

  console.log(userId, "SetUser userId");
  if (userId) {
    req.user = User.findById((user) => user.id === user);
  }
  next();
}

async function authUser(req, res, next) {
  const article = await Blog.findOne({ slug: req.params.slug });
  let userId = article.author._id;
  let user = res.locals.user._id;

  console.log(userId, "authUSER");
  console.log(user, "$Matched USER");

  if (userId !== user) {
    res.status(403);
    return res.redirect("/kukumonts/privileges");
  }
  next();
}

function authRole(role) {
  return (req, res, next) => {
    const user =
      res.locals.user.role.ROLE.ADMIN ||
      res.locals.user.role.ROLE.EDITOR ||
      res.locals.user.role.ROLE.USER;

    console.log(role);
    console.log(user);
    if (user !== role) {
      res.status(401);
      return res.render("401");
    }
    next();
  };
}

// check current user
const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        console.log("UserId from checkUser");
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser, authUser, authRole };
