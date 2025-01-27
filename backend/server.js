const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Load questions from JSON file
const questions = require('./questions.json');

app.get('/', (req, res) => {
  res.send("Backend is Running");
})
// API endpoint to fetch questions based on set
app.get('/api/questions', (req, res) => {
  const set = req.query.set;
  if (!questions[set]) {
    return res.status(404).json({ error: 'Question set not found' });
  }
  res.json(questions[set]);
});

// API endpoint to generate a contest
app.post('/api/generate-contest', (req, res) => {
  const set = req.body.set;
  if (!questions[set]) {
    return res.status(404).json({ error: 'Question set not found' });
  }

  const contest = {
    easy: getRandomQuestions(questions[set].easy, 1),
    medium: getRandomQuestions(questions[set].medium, 2),
    hard: getRandomQuestions(questions[set].hard, 1),
  };

  res.json(contest);
});

// Helper function to get random questions
function getRandomQuestions(questionArray, count) {
  const shuffled = questionArray.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});