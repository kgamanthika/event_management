import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookingPage = () => {
  const { eventId } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const navigate = useNavigate(); // To navigate programmatically after booking

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

  const handleBooking = async () => {
    try {
      // Send booking request to backend
      const response = await axios.post('http://localhost:5000/api/bookings', { eventId });
      console.log('Booking successful:', response.data); // Log the booking response
      alert(`Successfully booked ${event.name}!`);
      
      // Navigate to another page (e.g., the bookings list or homepage)
      navigate('/');
    } catch (error) {
      console.error('Error booking event:', error);
    }
  };

  if (!event) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }

  return (
    <div>
      <h2>Event Details</h2>
      <h3>{event.name}</h3>
      <p>{new Date(event.date).toLocaleDateString()}</p> {/* Convert date to a readable format */}
      <p>{event.location}</p>
      
      {/* Add Book Now button */}
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default BookingPage;
