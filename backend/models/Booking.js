// booking.js

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",  // Ensures that the eventId references the Event model
        required: true,
    },
    userId: {  // Referring to userId instead of a string
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Assuming you have a User model
        required: true,
    },
    bookedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("Booking", bookingSchema);
