const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const fs = require("fs");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.validate = (method) => {
  switch (method) {
    case "signup": {
      return [
        body("email", "Email invalide").isEmail(),
        body("password", "Mot de passe invalide").isLength({ min: 6 }),
      ];
    }
  }
};
//get all users
exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
//find user by id
exports.getUserById = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
//delet user

exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      console.log(String(user._id));
      console.log(req.auth.userId);
      if (String(user._id) !== req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        // const filename = user.imageUrl.split("/images/")[1];
        // fs.unlink(`images/${filename}`, () => {
        user.deleteOne({ _id: req.params.id }).then(() => {
          res.status(200).json({ message: "Objet supprimé !" });
        });
        //     .catch((error) => res.status(401).json({ error }));
        // });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//edit user
exports.modifyUser = (req, res, next) => {
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete userObject._userId;
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        user
          .updateOne(
            { _id: req.params.id },
            { ...userObject, _id: req.params.id }
          )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
