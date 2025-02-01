const Event = require("../models/Event");

// Get all events
const getEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
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

module.exports = { getEvents, addEvent, updateEvent, deleteEvent };
