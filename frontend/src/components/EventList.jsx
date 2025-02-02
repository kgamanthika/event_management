import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [userId] = useState("679e10553233a6d0a1c03930"); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleBooking = async (eventId) => {
    try {
      const response = await axios.post("http://localhost:5000/api/bookings/book", { userId, eventId });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error booking event");
    }
  };

  const handleShowBookings = () => {
    navigate('/bookings');
  };

  const handleAdminPanel = () => {
    navigate('/admin-panel');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Upcoming Events</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event._id} className="p-4 border rounded-lg shadow-md bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
            <p className="text-gray-600">{new Date(event.date).toLocaleDateString()} - {event.location}</p>
            <button 
              onClick={() => handleBooking(event._id)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Book Now
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between">
        <button 
          onClick={handleShowBookings} 
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
        >
          Show My Bookings
        </button>
        <button 
          onClick={handleAdminPanel} 
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
        >
          Admin Panel
        </button>
      </div>
    </div>
  );
};

export default EventList;
