const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const publicationCtrl = require("../controllers/like");
// Aimer une publication
router.post("/:id", auth, publicationCtrl.like);

module.exports = router;
