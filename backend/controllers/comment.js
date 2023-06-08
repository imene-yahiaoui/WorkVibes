// in controllers/stuff.js
const fs = require("fs");
const Comment = require("../models/Comment");
const moment = require("moment");

//createComment
exports.createComment = (req, res, next) => {
    const commentObject = {
      ...req.body,
      publicationDate: moment().format("MMMM D, YYYY"), // Obtaining the date in "Month day, Year" format
      userId: req.auth.userId,
      postId: req.params.id, // Retrieve the ID of the post from the request parameters in fetch 
    };
  
    const newComment = new Comment(commentObject);
  
    newComment
      .save()
      .then(() => {
        res.status(201).json({ message: "Comment saved!" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };
// exports.createComment = (req, res, next) => {
//   const commentObject = {
//         ...req.body,
//         publicationDate: moment().format("MMMM D, YYYY"), // Obtenir la date au format "month day, year"
     
//     }
//     comment.findOne({ _id: req.params.id })
//     .then((comment) => {
//   const comment = new Comment({
//     ...commentObject,
//     userId: req.auth.userId,
//     _id:req.auth._id,
//   });
//     })
//   comment
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Objet enregistré !" });
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };

//modifyComment
exports.modifyComment = (req, res, next) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete postObject._userId;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Post.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//deleteComment

exports.deleteComment = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        // S'il y a une image
        if (post.imageUrl) {
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, (error) => {
            if (error) {
              res.status(500).json({ error });
            } else {
              post
                .deleteOne({ _id: req.params.id })
                .then(() => {
                  res.status(200).json({ message: "Post deleted!" });
                })
                .catch((error) => res.status(500).json({ error }));
            }
          });
        } else {
          post
            .deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Post deleted!" });
            })
            .catch((error) => res.status(500).json({ error }));
        }
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//getAllComment
exports.getAllComment = (req, res, next) => {
  Comment.find()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
