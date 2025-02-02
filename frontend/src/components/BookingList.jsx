import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'success' or 'error'
  const [selectedBookingId, setSelectedBookingId] = useState(null);
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

  // Function to handle booking deletion
  const handleDelete = async (bookingId) => {
    setSelectedBookingId(bookingId); // Store the selected booking ID for deletion
    setModalMessage('Are you sure you want to delete this booking?'); // Set the confirmation message
    setModalType('error'); // Display as a confirmation modal
    setShowModal(true); // Show the modal
  };

  // Function to confirm deletion (OK button click)
  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/bookings/${selectedBookingId}`);
      setModalMessage(response.data.message); // Set the success message
      setModalType('success'); // Set modal type to success
      setBookings(bookings.filter((booking) => booking._id !== selectedBookingId)); // Remove deleted booking from the list
    } catch (error) {
      console.error('Error deleting booking:', error);
      setModalMessage('Error deleting booking'); // Set the error message
      setModalType('error'); // Set modal type to error
    }
    setShowModal(false); // Hide the modal after confirming the action
  };

  // Handle Cancel button click to cancel the action (don't delete)
  const handleCancel = () => {
    setShowModal(false); // Hide the modal without deleting the booking
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-red-600 mb-6 text-center">
        Your Bookings
      </h2>

      {bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="p-4 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition-all">
              <h3 className="text-xl font-bold text-blue-600">{booking.eventId.name}</h3>
              <p className="text-gray-600">Date: {new Date(booking.eventId.date).toLocaleDateString()}</p>
              <p className="text-gray-600">Location: {booking.eventId.location}</p>
              <p className="text-green-500 font-semibold">Status: Successfully Booked!</p>
              <button
                onClick={() => handleDelete(booking._id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
              >
                Delete Booking
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}

      <div className="text-center mt-6">
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
        >
          Back
        </button>
      </div>

      {/* Custom Popup Modal for Success/Error Messages */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div
            className={`bg-white p-6 rounded-lg shadow-lg w-96 text-center ${modalType === 'success' ? 'bg-green-100' : 'bg-red-100'}`}
          >
            <h3 className={`text-xl font-semibold ${modalType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {modalMessage}
            </h3>
            <div className="mt-4 flex justify-around">
              {modalType === 'error' ? (
                <>
                  <button
                    onClick={confirmDelete} // Confirm and delete the booking
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-opacity-80 transition-all"
                  >
                    OK
                  </button>
                  <button
                    onClick={handleCancel} // Cancel the action (don't delete)
                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-opacity-80 transition-all"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCancel} // Dismiss success/error message
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-opacity-80 transition-all"
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingList;
