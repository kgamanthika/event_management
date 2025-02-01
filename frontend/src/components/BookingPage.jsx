import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookingPage = () => {
  const { eventId } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div>
      <h2>Event Details</h2>
      <h3>{event.name}</h3>
      <p>{event.date} - {event.location}</p>
      <button>Confirm Booking</button>
    </div>
  );
};

export default BookingPage;
