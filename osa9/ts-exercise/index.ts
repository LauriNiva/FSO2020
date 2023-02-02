import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
  if (!isNaN(Number(weight)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({ weight, height, bmi });
  } else {
    res.send({ error: 'malformatted parameters' });
  }
});

app.post('/calc', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: { daily_exercises: any; target: any } =
    req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
  } else {
    if (
      !isNaN(Number(target)) &&
      Array.isArray(daily_exercises) &&
      !daily_exercises.some((arg) => isNaN(Number(arg)))
    ) {
      const result = calculateExercises(
        daily_exercises.map((arg) => Number(arg)),
        Number(target)
      );
      res.send(result);
    } else {
      res.status(400).send({ error: 'malformatted parameters' });
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
