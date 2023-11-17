import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Appointment from './UserAccess/Appointment';
import Request from './UserAccess/Request';
import CreateID from './UserAccess/CreateID';
import LoginStaff from './UserAccess/LoginStaff';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
         <Route path="/" element={<Home />}/>
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/Request" element={<Request />} />
          <Route path="/CreateID" element={<CreateID />} />
          <Route path="/LoginStaff" element={<LoginStaff />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;