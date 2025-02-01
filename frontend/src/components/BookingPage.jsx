import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookingPage = () => {
  const { eventId } = useParams(); // Get eventId from the URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Fetch event details from backend using eventId
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEvent(response.data); // Set the event data in state
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]); // Dependency array ensures the effect runs when eventId changes

  if (!event) {
    return <div>Loading event details...</div>;
  }

  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.date} - {event.location}</p>
      <p>Description: {event.description}</p> {/* Example additional field */}
      {/* Add your booking form or booking details here */}
      <button>Book Now</button>
    </div>
  );
};

export default BookingPage;
