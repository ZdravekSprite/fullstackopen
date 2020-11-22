import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(bodyParser.json());

interface Body {
  daily_exercises: number[];
  target: number;
}

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

app.post('/exercises', (req, res) => {
  const { daily_exercises, target }: Body = req.body as Body;
  if (!daily_exercises || !target) {
    res.status(400).json({
      error: 'parameters missing'
    });
  }

  if (
    !daily_exercises.every((day) => !isNaN(Number(day))) ||
    isNaN(Number(target))
  ) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  res.json(
    calculateExercises(
      daily_exercises.map((day) => Number(day)),
      Number(target)
    )
  );
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});