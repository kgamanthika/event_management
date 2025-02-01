import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const navigate = useNavigate();

  // Fetch events from backend
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

  // Handle delete event
  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      alert(response.data.message);
      // Update the events list by filtering out the deleted event
      setEvents(events.filter(event => event._id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };

  // Handle edit event
  const handleEdit = (event) => {
    setEditEvent(event); // Set the event to edit
  };

  // Handle event update
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/events/${editEvent._id}`, editEvent);
      alert(response.data.message);
      // Update the events list with the updated event
      setEvents(events.map(event => (event._id === editEvent._id ? editEvent : event)));
      setEditEvent(null); // Reset the edit form
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error updating event');
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
    <div>
      <h2>Admin Panel</h2>
      <button onClick={handleShowEvents}>Show Events</button>

      <button onClick={handleAddEvent}>Add Event</button>
      <h3>Event List</h3>
      {editEvent ? (
        <div>
          <h3>Edit Event</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <label>
              Event Name:
              <input
                type="text"
                value={editEvent.name}
                onChange={(e) => setEditEvent({ ...editEvent, name: e.target.value })}
                required
              />
            </label>
            <br />
            <label>
              Date:
              <input
                type="date"
                value={editEvent.date}
                onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
                required
              />
            </label>
            <br />
            <label>
              Location:
              <input
                type="text"
                value={editEvent.location}
                onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })}
                required
              />
            </label>
            <br />
            <button type="submit">Update Event</button>
          </form>
        </div>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <h4>{event.name}</h4>
              <p>{new Date(event.date).toLocaleDateString()} - {event.location}</p>
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
