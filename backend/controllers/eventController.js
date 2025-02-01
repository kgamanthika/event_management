const Event = require("../models/Event");

// Get all events
const getEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
};


const getEventById = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);  // Look for the event by the ID
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);  // Send event data back to the frontend
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Server error" });  
    }
  };
  


// Add a new event
const addEvent = async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
};

// Update an event
const updateEvent = async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
};

// Delete an event
const deleteEvent = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
};

module.exports = { getEvents, addEvent, updateEvent, deleteEvent, getEventById };
