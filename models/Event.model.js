const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required.'],
            unique: true,
            lowercase: true,
            trim: true
        },
        date: {
            type: Date,
            required: [true, 'Date is required.']
        },
        description: {
            type: String,
            required: [true, 'Description is required.']
        },
        location: {
            type: String,
            required: [true, 'Location is required.']
        },
        participants: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
        }
    },
    {
        timestamps: true
    }
);

const Event = model('Event', eventSchema);

module.exports = Event;