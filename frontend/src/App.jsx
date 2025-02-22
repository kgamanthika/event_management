import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import BookingList from './components/BookingList';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import './index.css';

const App = () => {
  return (
    <Router>
        
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/add-event" element={<EventForm />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          </Routes>
    </Router>
  );
};

export default App;
