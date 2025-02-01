import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();  // Initialize the navigate function

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Attempt to fetch events from the API
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);  // If successful, use the API data
      } catch (error) {
        console.error('Error fetching events:', error);
        // If fetching fails, you can set fallback/mock data if needed
      }
    };

    fetchEvents();
  }, []);

  // Handle booking the event and navigate to the booking page
  const handleBooking = (eventId) => {
    // Navigate to the BookingPage with the eventId
    navigate(`/book/${eventId}`);
  };

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}> {/* Use _id from MongoDB */}
            <h3>{event.name}</h3>
            <p>{new Date(event.date).toLocaleDateString()} - {event.location}</p>
            <button onClick={() => handleBooking(event._id)}>Book Now</button> {/* Pass _id */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
