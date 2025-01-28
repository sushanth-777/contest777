import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function ContestPage() {
  const location = useLocation();
  const { contest, selectedTime } = location.state; // Retrieve state passed via navigate
  const [timeLeft, setTimeLeft] = useState(selectedTime * 60); // Initialize timer

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up on unmount
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Contest Questions</h1>

      <div className="card">
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
          <h3 className="timer">
            Time Left: {formatTime(timeLeft)}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ContestPage;