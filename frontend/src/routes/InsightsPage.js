import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';

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
      <div key={q.id} className={`insight-card ${difficulty}`}>
        <div className="insight-content">
          <p className="question-title">{q.title}</p>
          <p className="time-taken">Time Taken: {q.timeTaken ? formatTime(q.timeTaken) : 'N/A'}</p>
        </div>
        <div className="insight-actions">
          <button
            onClick={() => window.open(q.youtubeLink, '_blank')}
            className="youtube-button"
          >
            YouTube
          </button>
        </div>
      </div>
    ))
  );

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-6 text-green-600">Insights</h1>
      <div className="card">
        <h2>Easy Questions</h2>
        {renderInsights('easy')}
        <h2>Medium Questions</h2>
        {renderInsights('medium')}
        <h2>Hard Questions</h2>
        {renderInsights('hard')}
      </div>
      <div className="mt-6">
        <p className="total-time-left">Total Time Left: {formatTime(timeLeft)}</p>
      </div>
    </div>
  );
}

export default InsightsPage;