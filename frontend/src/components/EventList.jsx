import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();  // Initialize the navigate function

  // Fetch events from the backend or use mock data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Attempt to fetch events from the API
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);  // If successful, use the API data
      } catch (error) {
        // If fetching fails, fall back to mock data
        console.error('Error fetching events:', error);
        // const eventsData = [
        //   { id: '', name: '', date: '', location: '' },
        // ];
        // setEvents(eventsData);
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
          <li key={event.id}>
            <h3>{event.name}</h3>
            <p>{event.date} - {event.location}</p>
            <button onClick={() => handleBooking(event.id)}>Book Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
