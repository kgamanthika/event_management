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
const getBookingsByUser = async (req, res) => {
  const { userId } = req.params;  

  try {
      const bookings = await Booking.find({ userId }).populate("eventId");

      if (!bookings || bookings.length === 0) {
          return res.status(404).json({ message: "No bookings found for this user" });
      }

      res.json(bookings);  
  } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Server error while fetching bookings" });
  }
};

const handleBooking = async () => {
  try {
    const userId = '679e10553233a6d0a1c03930';  
    const response = await axios.post('http://localhost:5000/api/bookings', { eventId, userId });
    console.log('Booking successful:', response.data);
    alert(`Successfully booked ${event.name}!`);
    navigate('/');
  } catch (error) {
    console.error('Error booking event:', error);
  }
};



module.exports = { bookEvent, getBookings,getBookingsByUser,handleBooking };
