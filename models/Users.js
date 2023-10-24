const mongoose = require("mongoose");
//const { isEmail } = require("validator");
//const validate = require('validator');
const bcrypt = require("bcrypt");

SALT_WORK_FACTOR = 10;

//mongoose.set("strictQuery", true);

const ROLE = {
  ADMIN: "Admin",
  EDITOR: "Editor",
  USER: "User",
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      minlength: [3, "Minimum characters for username is 3"],
      maxlength: [20, "Max characters for username is 20"],
      unique: true,
    },
    // email: {
    //   type: String,
    //   //required: [true, "Please enter an email!"],
    //   unique: true,
    //   lowercase: true,
    //   validate: [isEmail, "Please enter a valid email!"],
    // },
    avatarImage: {
      type: Buffer,
      required: [true, "Whoops avatar is required"],
      virtuals: true,
    },
    avatarImageType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    role: {
      ROLE: {
        ADMIN: String,
        EDITOR: String,
        USER: String,
      },
    },
    password: {
      type: String,
      required: [true, "Please enter a password!"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("avatarImagePath").get(function () {
  if (this.avatarImage != null && this.avatarImageType != null) {
    return `data:${
      this.avatarImageType
    };charset=utf-8;base64,${this.avatarImage.toString("base64")}`;
  }
});

userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

//Static method to jogin user
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

const User = mongoose.model("User", userSchema);
module.exports = ROLE;
module.exports = User;
