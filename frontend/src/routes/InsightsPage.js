import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import youtubeLogo from '../assets/youtube-logo.png'; // Import the YouTube logo

function InsightsPage() {
  const location = useLocation();
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
            onClick={() => window.open(q.youtubeLink, '_blank')}
            className="youtube-button"
          >
            <img src={youtubeLogo} alt="YouTube" className="youtube-logo" />
          </button>
        </div>
      </div>
    ))
  );

  return (
    <div className="App">
      <div className="card-container">
        <h1 className="text-3xl font-bold mb-6 text-green-600 text-center">Insights</h1>
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
