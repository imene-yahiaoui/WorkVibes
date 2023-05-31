// in controllers/stuff.js
const fs = require("fs");
const Post = require("../models/Post");

exports.createPost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete postObject._id;
  delete postObject._userId;
  const post = new Post({
    ...postObject,
    userId: req.auth.userId,
  });

  post
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// exports.createPost = (req, res, next) => {
//   const postObject = JSON.parse(req.body.post);
//   delete postObject._id;
//   delete postObject._userId;
//   const post = new Post({
//     ...postObject,
//     userId: req.auth.userId,
//     imageUrl: `${req.protocol}://${req.get("host")}/images/${
//       req.file.filename
//     }`,
//   });

//   post
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Objet enregistré !" });
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//edite
exports.modifyPost = (req, res, next) => {
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

//delete
// exports.deletePost = (req, res, next) => {
//   Post.findOne({ _id: req.params.id })
//     .then((post) => {
//       if (String(user._id) != req.auth.userId) {
//         res.status(401).json({ message: "Not authorized" });
//       } else {
//         const filename = post.imageUrl.split("/images/")[1];
//         fs.unlink(`images/${filename}`, () => {
//           Post.deleteOne({ _id: req.params.id })
//             .then(() => {
//               res.status(200).json({ message: "User deleted!" });
//             })
//             .catch((error) => res.status(401).json({ error }));
//         });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      console.log("11111111", String(user._id));
      console.log("2222222222222", req.auth.userId);
      if (String(user._id) !== req.auth.userId) {
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

//get all
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//find post by id

exports.getPostById = (req, res, next) => {
  const postId = req.params.id;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
