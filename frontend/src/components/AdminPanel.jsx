import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal visibility state
  const [eventToDelete, setEventToDelete] = useState(null); // The event being deleted
  const navigate = useNavigate();

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        showPopup('Error fetching events', 'error');
      }
    };
    fetchEvents();
  }, []);

  // Show Popup
  const showPopup = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setTimeout(() => {
      setPopupMessage(null);
    }, 5000);
  };

  // Handle delete event
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/events/${eventToDelete._id}`);
      showPopup(response.data.message, 'success');
      setEvents(events.filter(event => event._id !== eventToDelete._id));
      setShowDeleteModal(false); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
      showPopup('Error deleting event', 'error');
      setShowDeleteModal(false); // Close the modal if an error occurs
    }
  };

  // Handle cancel delete action
  const handleCancelDelete = () => {
    setShowDeleteModal(false); // Close the modal
  };

  // Handle edit event
  const handleEdit = (event) => {
    setEditEvent(event);
  };

  // Handle event update
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/events/${editEvent._id}`, editEvent);
      showPopup(response.data.message, 'success');
      setEvents(events.map(event => (event._id === editEvent._id ? editEvent : event)));
      setEditEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
      showPopup('Error updating event', 'error');
    }
  };

  // Navigate to EventList page
  const handleShowEvents = () => {
    navigate('/');
  };

  // Navigate to EventForm page for adding new event
  const handleAddEvent = () => {
    navigate('/add-event');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 to-indigo-200">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg w-full">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Admin Panel</h2>
        <div className="flex justify-between mb-6">
          <button
            onClick={handleShowEvents}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
          >
            Home
          </button>
          <button
            onClick={handleAddEvent}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Event
          </button>
        </div>

        {/* Popup Message */}
        {popupMessage && (
          <div className={`p-4 mb-6 rounded-lg text-white ${popupType === 'success' ? 'bg-green-600' : popupType === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
            <strong>{popupType === 'success' ? 'Success!' : popupType === 'error' ? 'Error!' : 'Info!'}</strong>
            <p>{popupMessage}</p>
          </div>
        )}

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Event List</h3>

        {editEvent ? (
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Event</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <label className="block mb-4">
                <span className="text-gray-700">Event Name</span>
                <input
                  type="text"
                  value={editEvent.name}
                  onChange={(e) => setEditEvent({ ...editEvent, name: e.target.value })}
                  required
                  className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">Date</span>
                <input
                  type="date"
                  value={editEvent.date}
                  onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
                  required
                  className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700">Location</span>
                <input
                  type="text"
                  value={editEvent.location}
                  onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })}
                  required
                  className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Update Event
              </button>
            </form>
          </div>
        ) : (
          <ul className="space-y-4 mt-6">
            {events.map((event) => (
              <li key={event._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">{event.name}</h4>
                  <p className="text-gray-600">{new Date(event.date).toLocaleDateString()} - {event.location}</p>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setShowDeleteModal(true); setEventToDelete(event); }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Are you sure you want to delete this event?</h3>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                >
                  OK
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300"
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

export default AdminPanel;
