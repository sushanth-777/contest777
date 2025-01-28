import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function ContestPage() {
  const location = useLocation();
  const { contest, selectedTime } = location.state;
  const [timeLeft, setTimeLeft] = useState(selectedTime * 60);
  const [questions, setQuestions] = useState({
    easy: contest.easy.map((q) => ({ ...q, completed: false, timeTaken: null, startTime: null })),
    medium: contest.medium.map((q) => ({ ...q, completed: false, timeTaken: null, startTime: null })),
    hard: contest.hard.map((q) => ({ ...q, completed: false, timeTaken: null, startTime: null })),
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

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSolveClick = (difficulty, id) => {
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [difficulty]: prevQuestions[difficulty].map((q) =>
        q.id === id
          ? { ...q, startTime: q.startTime === null ? selectedTime * 60 - timeLeft : q.startTime }
          : q
      ),
    }));
  };

  const handleCheckboxChange = (difficulty, id) => {
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [difficulty]: prevQuestions[difficulty].map((q) =>
        q.id === id
          ? {
              ...q,
              completed: !q.completed,
              timeTaken: q.completed ? null : (selectedTime * 60 - timeLeft) - q.startTime,
              startTime: q.completed ? null : q.startTime,
            }
          : q
      ),
    }));
  };

  const renderQuestion = (q, difficulty) => (
    <div
      key={q.id}
      className={`question-card ${difficulty} ${q.completed ? 'completed' : ''}`}
    >
      <span className="question-title">{q.title}</span>
      <div className="question-actions">
        <button
          onClick={() => {
            handleSolveClick(difficulty, q.id);
            window.open(q.link, '_blank');
          }}
          className="solve-button"
        >
          Solve
        </button>
        <input
          type="checkbox"
          checked={q.completed}
          onChange={() => handleCheckboxChange(difficulty, q.id)}
          className="checkbox"
        />
        {q.completed && (
          <span className="time-taken">
            Time: {formatTime(q.timeTaken)}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Contest Questions</h1>

      <div className="card">
        <div className="space-y-4">
          {questions.easy.map((q) => renderQuestion(q, 'easy'))}
          {questions.medium.map((q) => renderQuestion(q, 'medium'))}
          {questions.hard.map((q) => renderQuestion(q, 'hard'))}
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
