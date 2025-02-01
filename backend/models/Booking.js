// booking.js

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",  
        required: true,
    },
    userId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  
        required: true,
    },
    bookedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("Booking", bookingSchema);
