import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [set, setSet] = useState('set_75');
  const [contest, setContest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0); // Timer starts at 0
  const [selectedTime, setSelectedTime] = useState(90); // Default: 90 minutes

  const handleGenerateContest = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/generate-contest', { set });
      setContest(response.data);
      setTimeLeft(0); // Reset timer to 0
    } catch (error) {
      console.error('Error generating contest:', error);
    }
  };

  const startTimer = () => {
    setTimeLeft(selectedTime * 60); // Convert minutes to seconds
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleTimeChange = (e) => {
    setSelectedTime(parseInt(e.target.value)); // Update selected time
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Coding Contest Generator</h1>

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
            onChange={handleTimeChange}
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

      {contest && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Contest Questions</h2>
          <div className="space-y-4">
            {contest.easy.map((q) => (
              <div key={q.id} className="question-card easy">
                <span>{q.title}</span>
                <a
                  href={q.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="problem-link"
                >
                  Solve Problem
                </a>
              </div>
            ))}
            {contest.medium.map((q) => (
              <div key={q.id} className="question-card medium">
                <span>{q.title}</span>
                <a
                  href={q.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="problem-link"
                >
                  Solve Problem
                </a>
              </div>
            ))}
            {contest.hard.map((q) => (
              <div key={q.id} className="question-card hard">
                <span>{q.title}</span>
                <a
                  href={q.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="problem-link"
                >
                  Solve Problem
                </a>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={startTimer}
              className="generate-button"
            >
              Start Timer
            </button>
            <h3 className="timer">
              Time Left: {formatTime(timeLeft)}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;