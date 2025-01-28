import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ContestPage from './ContestPage'; // Import the ContestPage component
import './App.css';

function Home() {
  const [set, setSet] = useState('set_75');
  const [selectedTime, setSelectedTime] = useState(90); // Default: 90 minutes
  const navigate = useNavigate();

  const handleGenerateContest = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/generate-contest', { set });
      const contestData = response.data;

      // Navigate to the contest page with the generated data and timer
      navigate('/contest', {
        state: {
          contest: contestData,
          selectedTime,
        },
      });
    } catch (error) {
      console.error('Error generating contest:', error);
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Contest777</h1>

      <div className="card">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Question Set</label>
          <select
            value={set}
            onChange={(e) => setSet(e.target.value)}
            className="select-dropdown"
          >
            <option value="set_75">75 Questions</option>
            <option value="set_150">150 Questions</option>
            <option value="set_455">455 Questions</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Timer</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(parseInt(e.target.value))}
            className="select-dropdown"
          >
            <option value={90}>90 Minutes</option>
            <option value={60}>60 Minutes</option>
            <option value={30}>30 Minutes</option>
          </select>
        </div>

        <button
          onClick={handleGenerateContest}
          className="generate-button"
        >
          Generate Contest
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contest" element={<ContestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
