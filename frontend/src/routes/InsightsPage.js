import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import youtubeLogo from '../assets/youtube-logo.png';

function InsightsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, timeLeft } = location.state;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const renderInsights = (difficulty) => (
    questions[difficulty].map((q) => (
      <div key={q.id} className={`question-card ${difficulty}`}>
        <span className="question-title">{q.title}</span>
        <div className="question-insights">
          <span className="time-taken">{q.timeTaken ? formatTime(q.timeTaken) : 'N/A'}</span>
          <button 
            onClick={() => q.youtubeLink && window.open(q.youtubeLink, '_blank')}
            className="youtube-button"
          >
            <img src={youtubeLogo} alt="YouTube" className="youtube-logo" />
          </button>
        </div>
      </div>
    ))
  );

  const handleNewContest = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <div className="card-container">
        <div className="new-contest-container">
          <button onClick={handleNewContest} className="new-contest-button">
            New Contest
          </button>
        </div>
        <div className="card">
          <div className="space-y-4">
            {renderInsights('easy')}
            {renderInsights('medium')}
            {renderInsights('hard')}
          </div>
          <div className="mt-6">
            <h3 className="timer">
              Total Time Left: {formatTime(timeLeft)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightsPage;
