import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import regenerateLogo from '../assets/regenerate-logo.png';

function ContestPage() {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleSubmit = () => {
    navigate('/insights', { state: { questions, selectedTime, timeLeft } });
  };

  const handleRegenerate = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/generate-contest', { set: "set_75" });
      const newContest = response.data;
      setQuestions({
        easy: newContest.easy.map((q) => ({ ...q, completed: false, timeTaken: null, startTime: null })),
        medium: newContest.medium.map((q) => ({ ...q, completed: false, timeTaken: null, startTime: null })),
        hard: newContest.hard.map((q) => ({ ...q, completed: false, timeTaken: null, startTime: null })),
      });
      setTimeLeft(selectedTime * 60);
    } catch (error) {
      console.error('Error regenerating contest:', error);
    }
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
        <h1 className="text-3xl font-bold mb-6 text-green-600 text-center">Contest Questions</h1>
        <button
          onClick={handleRegenerate}
          className="regenerate-button"
        >
          <img src={regenerateLogo} alt="Regenerate" className="regenerate-logo" />
        </button>
        <div className="contest-card">
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
          <button
            onClick={handleSubmit}
            className="submit-button mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContestPage;
