const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: { type: String, required: true },
  postId: { type: String, required: true },
  userId: { type: String, required: true },
  publicationDate: { type: String, required: true },
});

module.exports = mongoose.model("Comment", commentSchema);
