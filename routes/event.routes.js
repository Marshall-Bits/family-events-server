const router = require("express").Router();
const Event = require("../models/Event.model");


router.post("", (req, res, next) => {
  const { date, participants, description, location, name } = req.body;

  if (!date || !participants || !description || !location || !name) {
    console.log("Missing fields");
  }

  Event.create(req.body)
    .then((event) => {
      res.status(201).json(event);
    })
    .catch((err) => {
      console.error("Error creating event", req.body);
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/", (req, res, next) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  Event.find({ date: { $gte: currentDate } })
    .sort({ date: 1 })
    .populate("participants")
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res, next) => {
  Event.findById(req.params.id)
    .populate("participants")
    .then((event) => {
      res.status(200).json(event);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res, next) => {
  Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((event) => {
      res.status(200).json(event);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res, next) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Event deleted" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/:id/participants", (req, res, next) => {
  Event.findByIdAndUpdate(
    req.params.id,
    { $push: { participants: req.body.userId } },
    { new: true }
  )
    .then((event) => {
      res.status(200).json(event);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id/participants/:userId", (req, res, next) => {
  Event.findByIdAndUpdate(
    req.params.id,
    { $pull: { participants: req.params.userId } },
    { new: true }
  )
    .then((event) => {
      res.status(200).json(event);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
