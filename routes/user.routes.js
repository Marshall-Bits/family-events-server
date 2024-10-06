const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

const saltRounds = 10;

router.get("/", (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res
      .status(400)
      .json({
        message: "Missing fields, please provide name, email and password",
      });
    return;
  }

  bcrypt
    .hash(password, saltRounds)
    .then((passwordHash) => {
      return User.create({ email, password: passwordHash, name });
    })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.error("Error creating user", err);
      res.status(500).json(err);
    });
});

module.exports = router;
