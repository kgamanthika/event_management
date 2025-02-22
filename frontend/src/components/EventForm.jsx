import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    location: ''
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true); // Show confirmation modal
  };

  // Handle confirmation (OK) to create the event
  const handleConfirm = async () => {
    try {
      // Send the data to the backend
      const response = await axios.post('http://localhost:5000/api/events', eventData); // Replace with your backend endpoint
      console.log('Event created:', response.data);

      // Clear form data after submission
      setEventData({ name: '', date: '', location: '' });

      // Redirect to the Event List page
      navigate('/');
    } catch (error) {
      console.error('Error creating event:', error);
    }

    setShowModal(false); // Close the modal
  };

  // Handle cancel action (close modal)
  const handleCancel = () => {
    setShowModal(false); // Close the modal without submitting
  };

  // Navigate to EventList page
  const handleShowEvents = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-indigo-200 flex justify-center items-center p-6">
      <div className="max-w-lg w-full p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">Create New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2" htmlFor="name">Event Name:</label>
            <input
              type="text"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2" htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2" htmlFor="location">Location:</label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center space-x-4">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-200"
            >
              Create Event
            </button>
          </div>
        </form>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowEvents}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none transition duration-200"
          >
            Show Events
          </button>
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to create this event?</h3>
              <div className="flex justify-between space-x-4">
                <button
                  onClick={handleConfirm}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-200"
                >
                  OK
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventForm;
