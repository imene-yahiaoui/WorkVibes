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

//find post by id

exports.getCommentById = (req, res, next) => {
  const commentId = req.params.id;
  Comment.findById(commentId)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//modifyComment
exports.modifyComment = (req, res, next) => {
  const commentObject = { ...req.body };

  Comment.findOne({ _id: req.params.id })
    .then((comment) => {
      if (comment.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Comment.updateOne(
          { _id: req.params.id },
          { ...commentObject, _id: req.params.id }
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
Comment.findOne({ _id: req.params.id })
    .then((comment) => {
      if (comment.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
       
        comment
            .deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Post deleted!" });
            })
            .catch((error) => res.status(500).json({ error }));
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
