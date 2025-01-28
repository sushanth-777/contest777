import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function ContestPage() {
  const location = useLocation();
  const { contest, selectedTime } = location.state; // Retrieve state passed via navigate
  const [timeLeft, setTimeLeft] = useState(selectedTime * 60); // Initialize timer
  const [questions, setQuestions] = useState({
    easy: contest.easy.map((q) => ({ ...q, completed: false })),
    medium: contest.medium.map((q) => ({ ...q, completed: false })),
    hard: contest.hard.map((q) => ({ ...q, completed: false })),
  });

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

  const handleCheckboxChange = (difficulty, id) => {
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [difficulty]: prevQuestions[difficulty].map((q) =>
        q.id === id ? { ...q, completed: !q.completed } : q
      ),
    }));
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Contest Questions</h1>

      <div className="card">
        <div className="space-y-4">
          {questions.easy.map((q) => (
            <div
              key={q.id}
              className={`question-card easy ${q.completed ? 'completed' : ''}`}
            >
              <span>{q.title}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(q.link, '_blank')} // Open link in new tab
                  className="solve-button"
                >
                  Solve
                </button>
                <input
                  type="checkbox"
                  checked={q.completed}
                  onChange={() => handleCheckboxChange('easy', q.id)}
                  className="checkbox"
                />
              </div>
            </div>
          ))}
          {questions.medium.map((q) => (
            <div
              key={q.id}
              className={`question-card medium ${q.completed ? 'completed' : ''}`}
            >
              <span>{q.title}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(q.link, '_blank')} // Open link in new tab
                  className="solve-button"
                >
                  Solve
                </button>
                <input
                  type="checkbox"
                  checked={q.completed}
                  onChange={() => handleCheckboxChange('medium', q.id)}
                  className="checkbox"
                />
              </div>
            </div>
          ))}
          {questions.hard.map((q) => (
            <div
              key={q.id}
              className={`question-card hard ${q.completed ? 'completed' : ''}`}
            >
              <span>{q.title}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(q.link, '_blank')} // Open link in new tab
                  className="solve-button"
                >
                  Solve
                </button>
                <input
                  type="checkbox"
                  checked={q.completed}
                  onChange={() => handleCheckboxChange('hard', q.id)}
                  className="checkbox"
                />
              </div>
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