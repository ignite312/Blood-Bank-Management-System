import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import Home from './Pages/Home';
import ViewDonor from './Pages/ViewDonor';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Donor" element={<ViewDonor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;