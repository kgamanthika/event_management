// src/components/EventList.jsx
import { useEffect, useState } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);

  // Mock data for events
  useEffect(() => {
    const fetchEvents = async () => {
      // In real-world apps, fetch data from an API or database
      const eventsData = [
        { id: 1, name: 'Music Concert', date: '2025-02-15', location: 'New York' },
        { id: 2, name: 'Tech Conference', date: '2025-03-10', location: 'San Francisco' },
        { id: 3, name: 'Food Festival', date: '2025-04-01', location: 'Los Angeles' }
      ];
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.name}</h3>
            <p>{event.date} - {event.location}</p>
            <button>Book Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
