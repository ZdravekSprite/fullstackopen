interface ExerciseMultiplyValues {
  value1: number[];
  value2: number;
}

const exerciseParseArguments = (args: Array<string>): ExerciseMultiplyValues => {
  let value1 = [];
  let value2;
  if (args.length < 4) throw new Error('Not enough arguments');
  for (var i = 2; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      if (i === 2) {
        value2 = Number(args[i]);
      } else {
        value1.push(Number(args[i]));
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  return {
    value1: value1,
    value2: value2
  }
}

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
  } else if (average > 0.85 * target) {
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

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

try {
  const { value1, value2 } = exerciseParseArguments(process.argv);
  //calculateExercises(value1, value2);
  console.log(calculateExercises(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}