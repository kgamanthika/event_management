import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    location: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real-world app, send this data to the backend to save the event
    console.log('Event Data:', eventData);
    setEventData({ name: '', date: '', location: '' }); // Clear form
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
