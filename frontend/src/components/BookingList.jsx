import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const userId = "679e10553233a6d0a1c03930"; // Replace with actual user ID
  const navigate = useNavigate(); // Hook to navigate to other pages

  // Fetch user bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, [userId]);

  // Function to navigate back
  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <h3>{booking.eventId.name}</h3><p>Date: {new Date(booking.eventId.date).toLocaleDateString()}</p>
<p>Location: {booking.eventId.location}</p>

              <p>Status: <strong>Successfully Booked!</strong></p> {/* Force status to 'Successfully Booked!' */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}

      {/* Back button */}
      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default BookingList;
