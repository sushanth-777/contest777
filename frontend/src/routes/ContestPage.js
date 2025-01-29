import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import questionsData from '../data/questions.json';
import '../App.css';
import regenerateLogo from '../assets/regenerate-logo.png';

function generateRandomQuestions(data) {
  const randomize = (arr, count) =>
    [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

  return {
    easy: randomize(data.easy, 1),
    medium: randomize(data.medium, 2),
    hard: randomize(data.hard, 1),
  };
}

function ContestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSet, selectedTime } = location.state;
  const [timeLeft, setTimeLeft] = useState(selectedTime * 60);
  const [questions, setQuestions] = useState(() =>
    generateRandomQuestions(questionsData[selectedSet])
  );

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
    if (seconds === null || seconds === undefined) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSolveClick = (difficulty, id) => {
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [difficulty]: prevQuestions[difficulty].map((q) =>
        q.id === id
          ? {
              ...q,
              startTime:
                q.startTime !== undefined && q.startTime !== null
                  ? q.startTime
                  : selectedTime * 60 - timeLeft,
            }
          : q
      ),
    }));
  };

  const handleCheckboxChange = (difficulty, id) => {
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [difficulty]: prevQuestions[difficulty].map((q) => {
        if (q.id === id) {
          if (!q.completed) {
            const timeTaken =
              q.startTime !== null
                ? selectedTime * 60 - timeLeft - q.startTime
                : null;
            return {
              ...q,
              completed: true,
              timeTaken: timeTaken,
            };
          } else {
            return {
              ...q,
              completed: false,
              timeTaken: null,
              startTime: null,
            };
          }
        }
        return q;
      }),
    }));
  };

  const handleSubmit = () => {
    navigate('/insights', { state: { questions, selectedTime, timeLeft } });
  };

  const handleRegenerate = () => {
    setQuestions(generateRandomQuestions(questionsData[selectedSet]));
    setTimeLeft(selectedTime * 60);
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
          <span className="time-taken">{formatTime(q.timeTaken)}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className="card-container">
        <h1 className="text-3xl font-bold mb-6 text-green-600 text-center">
          Contest Questions
        </h1>
        <button onClick={handleRegenerate} className="regenerate-button">
          <img src={regenerateLogo} alt="Regenerate" className="regenerate-logo" />
        </button>
        <div className="card">
          <div className="space-y-4">
            {questions.easy.map((q) => renderQuestion(q, 'easy'))}
            {questions.medium.map((q) => renderQuestion(q, 'medium'))}
            {questions.hard.map((q) => renderQuestion(q, 'hard'))}
          </div>
          <div className="mt-6">
            <h3 className="timer">Time Left: {formatTime(timeLeft)}</h3>
          </div>
          <button onClick={handleSubmit} className="submit-button mt-4">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContestPage;
