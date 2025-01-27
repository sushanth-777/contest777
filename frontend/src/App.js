import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [set, setSet] = useState('set_75');
  const [contest, setContest] = useState(null);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds

  const handleGenerateContest = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/generate-contest', { set });
      setContest(response.data);
    } catch (error) {
      console.error('Error generating contest:', error);
    }
  };

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  return (
    <div className="App">
      <h1>Coding Contest Generator</h1>
      <select value={set} onChange={(e) => setSet(e.target.value)}>
        <option value="set_75">75 Questions</option>
        <option value="set_150">150 Questions</option>
        <option value="set_455">455 Questions</option>
      </select>
      <button onClick={handleGenerateContest}>Generate Contest</button>

      {contest && (
        <div>
          <h2>Contest Questions</h2>
          <h3>Easy:</h3>
          <ul>
            {contest.easy.map((q) => (
              <li key={q.id}>
                <a href={q.link} target="_blank" rel="noopener noreferrer">
                  {q.title}
                </a>
              </li>
            ))}
          </ul>
          <h3>Medium:</h3>
          <ul>
            {contest.medium.map((q) => (
              <li key={q.id}>
                <a href={q.link} target="_blank" rel="noopener noreferrer">
                  {q.title}
                </a>
              </li>
            ))}
          </ul>
          <h3>Hard:</h3>
          <ul>
            {contest.hard.map((q) => (
              <li key={q.id}>
                <a href={q.link} target="_blank" rel="noopener noreferrer">
                  {q.title}
                </a>
              </li>
            ))}
          </ul>
          <button onClick={startTimer}>Start Timer</button>
          <h3>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</h3>
        </div>
      )}
    </div>
  );
}

export default App;