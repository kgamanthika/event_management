// src/App.jsx

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BookingList from './components/BookingList';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

const App = () => {
  return (
    <Router>
        
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/add-event" element={<EventForm />} />
          </Routes>
    </Router>
  );
};

export default App;
