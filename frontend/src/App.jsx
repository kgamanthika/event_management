// src/App.jsx

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BookingList from './components/BookingList';
import BookingPage from './components/BookingPage';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Event Management</h1>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/create-event" element={<EventForm />} />
          <Route path="/book/:eventId" element={<BookingPage />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
