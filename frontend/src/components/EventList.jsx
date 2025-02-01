import axios from 'axios';
import { useEffect, useState } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);

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
        const eventsData = [
          { id: 1, name: 'Music Concert', date: '2025-02-15', location: 'New York' },
          { id: 2, name: 'Tech Conference', date: '2025-03-10', location: 'San Francisco' },
          { id: 3, name: 'Food Festival', date: '2025-04-01', location: 'Los Angeles' }
        ];
        setEvents(eventsData);
      }
    };

    fetchEvents();
  }, []);

  // Handle booking the event
  const handleBooking = async (eventId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', { eventId });
      console.log('Booking response:', response.data); // Log the response data
      alert(`Event booked: ${response.data.event.name}`);
    } catch (error) {
      console.error("Error booking event:", error);
    }
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
