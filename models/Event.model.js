const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      trim: true,
    },
    participants: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    extraParticipants: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
