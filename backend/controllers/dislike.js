const Publication = require("../models/Post");

// Ne pas aimer une publication
exports.dislike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId;

    // Vérifier si l'utilisateur a déjà indiqué qu'il n'aime pas la publication
    const publication = await Publication.findById(postId);
    if (publication.dislikes.includes(userId)) {
      return res.status(400).json({
        erreur: "You have already indicated that you dislike this publication.",
      });
    }

    // Ajouter l'ID de l'utilisateur dans le tableau des "dislikes"
    publication.dislikes.push(userId);
    await publication.save();

    res.status(200).json({
      message: "Publication successfully marked as Disliked",
    });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: "Internal server error." });
  }
};
