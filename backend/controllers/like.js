const Publication = require("../models/Post");

// Aimer une publication
exports.like = async (req, res) => {
  try {
    const postId = req.params.id;

    const userId = req.body.userId;

    // Vérifier si l'utilisateur a déjà aimé la publication
    const publication = await Publication.findById(postId);
    if (publication.likes.includes(userId)) {
      return res
        .status(400)
        .json({ erreur: "You have already liked this post." });
    }
    if (publication.dislikes.includes(userId)) {
      return res.status(400).json({
        erreur: "You have already indicated that you dislike this publication.",
      });
    }

    // Ajouter l'ID de l'utilisateur dans le tableau des "likes"
    publication.likes.push(userId);
    await publication.save();

    res.status(200).json({ message: "Post liked successfully." });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: "Internal server error." });
  }
};
