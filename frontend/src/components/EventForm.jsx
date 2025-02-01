import axios from 'axios'; // Make sure axios is imported for API calls
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    location: ''
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the data to the backend (or use a mock API for now)
      const response = await axios.post('http://localhost:5000/api/events', eventData); // Replace with your backend endpoint
      console.log('Event created:', response.data);

      // Clear form data after submission
      setEventData({ name: '', date: '', location: '' });

      // Redirect to the Event List page
      navigate('/');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  // Navigate to EventList page
  const handleShowEvents = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Create Event</button>
      </form>

      {/* Button to navigate to EventList */}
      <button onClick={handleShowEvents}>Show Events</button>
    </div>
  );
};

export default EventForm;
