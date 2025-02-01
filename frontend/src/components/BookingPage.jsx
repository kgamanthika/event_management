import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookingPage = () => {
  const { eventId } = useParams(); // Get eventId from URL
  const [event, setEvent] = useState(null);
  const [bookings, setBookings] = useState([]); // State to store the bookings
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Fetch event details
        const eventResponse = await axios.get(`http://localhost:5000/api/events/${eventId}`);
        setEvent(eventResponse.data);

        // Fetch bookings for this event
        const bookingsResponse = await axios.get(`http://localhost:5000/api/bookings/event/${eventId}`);
        setBookings(bookingsResponse.data);

        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // In case of error, stop loading
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Event Details</h2>
      {event && (
        <>
          <h3>{event.name}</h3>
          <p>{new Date(event.date).toLocaleDateString()}</p>
          <p>{event.location}</p>
        </>
      )}
      
      <h3>Booked Users</h3>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <p>Booked At: {new Date(booking.bookedAt).toLocaleString()}</p>
            <p>User ID: {booking.userId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingPage;
