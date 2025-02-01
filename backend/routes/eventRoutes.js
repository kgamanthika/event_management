const express = require("express");
const router = express.Router();
const { getEvents, addEvent, updateEvent, deleteEvent, getEventById } = require("../controllers/eventController");

router.get("/", getEvents);
router.get("/:id", getEventById);  // Add this line to get event by ID
router.post("/", addEvent);
const Event = require('../models/Event'); // Event model
const Booking = require('../models/Booking'); // Booking model

// DELETE route to delete an event and its associated bookings
router.delete('/:id', async (req, res) => {
  const eventId = req.params.id;

  try {
    // First, delete the bookings associated with this event
    await Booking.deleteMany({ eventId });

    // Now, delete the event
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event and associated bookings deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

// Update event by ID
router.put('/:id', async (req, res) => {
    try {
      const { name, date, location } = req.body;
      const event = await Event.findByIdAndUpdate(
        req.params.id,
        { name, date, location },
        { new: true } // Return the updated event
      );
      if (!event) {
        return res.status(404).send({ message: 'Event not found' });
      }
      res.send({ message: 'Event updated successfully', event });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error updating event' });
    }
  });
  
module.exports = router;
