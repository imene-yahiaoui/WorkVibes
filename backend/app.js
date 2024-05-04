const express = require("express");
const path = require("path");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");
const dislikeRoutes = require("./routes/dislike");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://ImeneYahiaoui:19921983@clusters.enxcmzl.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log(Error, "Connexion à MongoDB échouée !"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/post", postRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/dislike", dislikeRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
