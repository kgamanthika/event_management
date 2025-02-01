// src/components/BookingList.jsx
import { useEffect, useState } from 'react';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  // Mock data for bookings
  useEffect(() => {
    const fetchBookings = async () => {
      // In real-world apps, fetch data from an API or database
      const bookingData = [
        { id: 1, event: 'Music Concert', user: 'John Doe', status: 'Confirmed' },
        { id: 2, event: 'Tech Conference', user: 'Jane Smith', status: 'Pending' }
      ];
      setBookings(bookingData);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <h3>{booking.event}</h3>
            <p>Booked by: {booking.user}</p>
            <p>Status: {booking.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
