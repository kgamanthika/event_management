const Booking = require("../models/Booking");

const bookEvent = async (req, res) => {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
};

const getBookings = async (req, res) => {
    const bookings = await Booking.find().populate("eventId");
    res.json(bookings);
};

module.exports = { bookEvent, getBookings };
