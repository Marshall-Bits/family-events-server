const router = require("express").Router();
const User = require("../models/User.model");

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
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});


module.exports = router;