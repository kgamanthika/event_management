import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [userId] = useState("679e10553233a6d0a1c03930");
  const [userBookings, setUserBookings] = useState([]);
  const [popup, setPopup] = useState({ message: '', show: false, type: '', eventId: null });
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

    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`);
        setUserBookings(response.data);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      }
    };

    fetchEvents();
    fetchUserBookings();
  }, [userId]);

  const handleBookingClick = (eventId) => {
    const isBooked = userBookings.some(booking => booking.eventId === eventId);

    if (isBooked) {
      setPopup({ message: "You have already booked this event.", show: true, type: 'error', eventId });
    } else {
      setPopup({ message: "Do you want to book this event?", show: true, type: 'confirm', eventId });
    }
  };

  const handleConfirmBooking = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/bookings/book", { userId, eventId: popup.eventId });
      setPopup({ message: response.data.message, show: true, type: 'success', eventId: null });
      // Update user bookings
      setUserBookings([...userBookings, { eventId: popup.eventId }]);
    } catch (error) {
      setPopup({ message: error.response?.data?.message || "Error booking event", show: true, type: 'error', eventId: null });
    }
  };

  const handleClosePopup = () => {
    setPopup({ show: false, eventId: null });
  };

  const handleShowBookings = () => {
    navigate('/bookings');
  };

  const handleAdminPanel = () => {
    navigate('/admin-panel');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-200 to-indigo-200">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg relative w-full">

        {popup.show && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 opacity-100">
            <div className={`w-full max-w-md px-6 py-4 rounded-xl text-black shadow-xl transform transition-all duration-300 ${popup.type === 'success' ? 'bg-green-300 text-white' : popup.type === 'error' ? 'bg-red-300' : 'bg-white'}`}>
              <h3 className="text-2xl font-semibold mb-4 text-center">{popup.type === 'success' ? 'Success' : popup.type === 'error' ? 'Error' : 'Notice'}</h3>
              <p className="text-lg mb-6 text-center">{popup.message}</p>
              <div className="flex justify-around">
                {popup.type === 'confirm' ? (
                  <>
                    <button
                      onClick={handleClosePopup}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmBooking}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                    >
                      Confirm
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleClosePopup}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                  >
                    OK
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-blue-800 tracking-tight">Upcoming Events</h2>
          <div className="space-x-4">
            <button
              onClick={handleShowBookings}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Show My Bookings
            </button>
            <button
              onClick={handleAdminPanel}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Admin Panel
            </button>
          </div>
        </div>

        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id} className="p-6 border-b-2 border-gray-200 rounded-lg shadow-lg bg-white hover:bg-blue-50 transition duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-600">{event.name}</h3>
                  <p className="text-gray-600 text-lg">{new Date(event.date).toLocaleDateString()} - {event.location}</p>
                </div>
                <button
                  onClick={() => handleBookingClick(event._id)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-md"
                >
                  Book Now
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventList;
