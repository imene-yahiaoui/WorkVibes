const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const publicationDislikeCtrl = require("../controllers/dislike");

// Ne pas aimer une publication
router.post("/:id", auth, publicationDislikeCtrl.dislike);

module.exports = router;
