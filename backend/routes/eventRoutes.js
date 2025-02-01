const express = require("express");
const router = express.Router();
const { getEvents, addEvent, updateEvent, deleteEvent, getEventById } = require("../controllers/eventController");

router.get("/", getEvents);
router.get("/:id", getEventById);  // Add this line to get event by ID
router.post("/", addEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
