// src/App.jsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BookingList from './components/BookingList';
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
