import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function ContestPage() {
  const location = useLocation();
  const { contest, selectedTime } = location.state; // Retrieve state passed via navigate
  const [timeLeft, setTimeLeft] = useState(selectedTime * 60); // Initialize timer

  // Initialize state for tracking completion of each question
  const [completedQuestions, setCompletedQuestions] = useState({
    easy: [],
    medium: [],
    hard: [],
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

  const handleCheckboxChange = (category, questionId) => {
    setCompletedQuestions((prevState) => {
      const updatedCategory = prevState[category].includes(questionId)
        ? prevState[category].filter((id) => id !== questionId)
        : [...prevState[category], questionId];

      return { ...prevState, [category]: updatedCategory };
    });
  };

  const getBoxClass = (category, questionId) => {
    return completedQuestions[category].includes(questionId)
      ? 'question-card completed'
      : `question-card ${category}`;
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Contest Questions</h1>

      <div className="card">
        <div className="space-y-4">
          {contest.easy.map((q) => (
            <div key={q.id} className={getBoxClass('easy', q.id)}>
              <div className="flex items-center justify-between">
                <span>{q.title}</span>
                <input
                  type="checkbox"
                  checked={completedQuestions.easy.includes(q.id)}
                  onChange={() => handleCheckboxChange('easy', q.id)}
                />
              </div>
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
            <div key={q.id} className={getBoxClass('medium', q.id)}>
              <div className="flex items-center justify-between">
                <span>{q.title}</span>
                <input
                  type="checkbox"
                  checked={completedQuestions.medium.includes(q.id)}
                  onChange={() => handleCheckboxChange('medium', q.id)}
                />
              </div>
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
            <div key={q.id} className={getBoxClass('hard', q.id)}>
              <div className="flex items-center justify-between">
                <span>{q.title}</span>
                <input
                  type="checkbox"
                  checked={completedQuestions.hard.includes(q.id)}
                  onChange={() => handleCheckboxChange('hard', q.id)}
                />
              </div>
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
