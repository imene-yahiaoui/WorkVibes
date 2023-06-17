const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  userId: { type: String, required: true },
  publicationDate: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur" }],
});

module.exports = mongoose.model("Post", postSchema);
