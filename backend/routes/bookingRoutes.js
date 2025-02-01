const express = require("express");
const router = express.Router();
const { bookEvent, getBookings } = require("../controllers/bookingController");

router.post("/", bookEvent);
router.get("/", getBookings);

module.exports = router;
