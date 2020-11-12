interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: number[], target: number): ExerciseResult => {
  const periodLength = exerciseHours.length;

  const trainingDays = exerciseHours.reduce(
    (count, day) => (day !== 0 ? count + 1 : count),
    0
  );

  const average = exerciseHours.reduce((count, day) => count + day, 0) / periodLength;

  let ratingDescription = '';
  let rating = 0;

  if (average >= target) {
    ratingDescription = 'great';
    rating = 3;
  } else if (average > 0.9 * target) {
    ratingDescription = 'not too bad but could be better';
    rating = 2;
  } else {
    ratingDescription = "try next time";
    rating = 1;
  }

  return {
    periodLength,
    trainingDays,
    success: average === target,
    rating,
    ratingDescription,
    target,
    average
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))