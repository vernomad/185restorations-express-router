const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const { ROLE } = require("../config/roles");
const { authRole } = require("../middleware/authMiddleware");

//Register login
//router.get("/register", authController.register_get);
router.post("/register", authController.register_post);
//router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

// router.post("/clicked", authController.clicked_post);
// router.post("/shared", authController.shared_post);
// router.get("/clicked", authController.clicked_get);
// router.get("/shared", authController.shared_get);

module.exports = router;
