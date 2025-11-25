import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CoolingLaw from './components/CoolingLaw';
import RadioactiveDecay from './pages/RadioactiveDecay';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cooling" element={<CoolingLaw />} />
            <Route path="/decay" element={<RadioactiveDecay />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;