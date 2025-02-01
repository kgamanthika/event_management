import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/manage" element={<EventForm />} />
      </Routes>
    </Router>
  );
}

export default App;
