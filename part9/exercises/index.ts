import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (
    req.query &&
    Object.keys(req.query).includes('weight') &&
    Number(req.query.height) > 0 &&
    Object.keys(req.query).includes('height') &&
    Number(req.query.weight) > 0
  )
    res.json(calculateBmi(Number(req.query.height), Number(req.query.weight)));
  else {
    res.status(400).json({
      error: 'malformatted parameters'
    });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});