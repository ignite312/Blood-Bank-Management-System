import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import DataInput from './Pages/DataInput';
import Home from './Pages/Home';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
         <Route path="/" element={<Home />}/>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/DataInput" element={<DataInput />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;