const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

// Endpoint to create a new booking
router.post("/book", async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    // Ensure userId and eventId are provided
    if (!userId || !eventId) {
      return res.status(400).json({ message: "Missing userId or eventId" });
    }

    // Check if the event is already booked by the user
    const existingBooking = await Booking.findOne({ userId, eventId });
    if (existingBooking) {
      return res.status(400).json({ message: "You have already booked this event" });
    }

    // Create a new booking
    const newBooking = new Booking({ userId, eventId });
    await newBooking.save();

    res.status(201).json({ message: "Event booked successfully!" });
  } catch (error) {
    console.error("Error booking event:", error);
    res.status(500).json({ message: "Server error while booking" });
  }
});

// Get bookings for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).populate("eventId");
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

module.exports = router;
