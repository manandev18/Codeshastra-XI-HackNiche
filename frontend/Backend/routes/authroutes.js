const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");
const verifyToken = require("../middleware/verifyfirebasetoken");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/profile", verifyToken, authController.getProfile);

module.exports = router;
