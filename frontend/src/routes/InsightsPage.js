import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';

function InsightsPage() {
  const location = useLocation();
  const { questions, selectedTime, timeLeft } = location.state;

  const renderInsights = (difficulty) => (
    questions[difficulty].map((q) => (
      <div key={q.id} className="insight-card">
        <p>{q.title}</p>
        <p>Completed: {q.completed ? 'Yes' : 'No'}</p>
        <p>Time Taken: {q.timeTaken ? `${q.timeTaken}s` : 'N/A'}</p>
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
      <div>
        <p>Total Time Left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}</p>
      </div>
    </div>
  );
}

export default InsightsPage;
