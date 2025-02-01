import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookingPage = () => {
  const { eventId } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Correct URL based on eventId
        const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        console.log('Event data:', response.data); // Log the event data
        setEvent(response.data); // Set event data to state
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]); // Re-fetch if eventId changes

  if (!event) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }

  return (
    <div>
      <h2>Event Details</h2>
      <h3>{event.name}</h3>
      <p>{new Date(event.date).toLocaleDateString()}</p> {/* Convert date to a readable format */}
      <p>{event.location}</p>
      {/* Add your booking form or any other details here */}
    </div>
  );
};

export default BookingPage;
