import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [userId] = useState("679e10553233a6d0a1c03930"); // Replace with actual user ID
  const navigate = useNavigate();

  // Fetch events from backend
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

  // Handle event booking
  const handleBooking = async (eventId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/bookings/book", { userId, eventId });
      alert(response.data.message); // Show success message
    } catch (error) {
      alert(error.response?.data?.message || "Error booking event");
    }
  };

  // Navigate to My Bookings page
  const handleShowBookings = () => {
    navigate('/bookings');
  };
  // Navigate to EventForm page for adding new event
  const handleAddEvent = () => {
    navigate('/add-event');
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
      <button onClick={handleAddEvent}>Add Event</button> 
    </div>
  );
};

export default EventList;
