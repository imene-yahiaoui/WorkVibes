const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const publicationCtrl = require("../controllers/like");
// Aimer une publication
router.post("/:id", auth, publicationCtrl.like);

// Ne pas aimer une publication
router.post("/:id", auth, publicationCtrl.dislike);

module.exports = router;
