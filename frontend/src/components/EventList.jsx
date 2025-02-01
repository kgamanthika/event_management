import axios from 'axios';
import { useEffect, useState } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const userId = "679e10553233a6d0a1c03930"; 

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  // Handle booking an event
  const handleBooking = async (eventId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/bookings/book", { userId, eventId });
      alert(response.data.message); // Show success message
      handleShowBookings(); // Refresh bookings after successful booking
    } catch (error) {
      alert(error.response?.data?.message || "Error booking event");
    }
  };

  // Handle fetching and showing user bookings
  const handleShowBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.name}</h3>
            <p>{new Date(event.date).toLocaleDateString()} - {event.location}</p>
            <button onClick={() => handleBooking(event._id)}>Book Now</button>
          </li>
        ))}
      </ul>

      <button onClick={handleShowBookings}>Show My Bookings</button>

      {/* Display bookings */}
      {bookings.length > 0 ? (
        <div>
          <h3>My Booked Events</h3>
          <ul>
            {bookings.map((booking) => (
              <li key={booking._id}>
                <p>Event: {booking.eventId.name}</p>
                <p>Date: {new Date(booking.eventId.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default EventList;
