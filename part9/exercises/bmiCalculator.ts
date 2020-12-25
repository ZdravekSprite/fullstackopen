/*
interface BmiMultiplyValues {
  value1: number;
  value2: number;
}

const bmiParseArguments = (args: Array<string>): BmiMultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    if (Number(args[2]) > 0 && Number(args[3]) > 0) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were 0 or negative numbers!');
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}
*/
type BmiResult = {
  height: number,
  weight: number,
  bmi: string
};

const calculateBmi = (height: number, weight: number): BmiResult => {
  const bmi = weight * 10000 / (height * height);
  const bmiObject = {
    weight: weight,
    height: height,
    bmi: ''
  };
  if (bmi < 15) {
    bmiObject.bmi = 'Very severely underweight';
  } else if (bmi < 16) {
    bmiObject.bmi = 'Severely underweight';
  } else if (bmi < 18.5) {
    bmiObject.bmi = 'Underweight';
  } else if (bmi < 25) {
    bmiObject.bmi = 'Normal (healthy weight)';
  } else if (bmi < 30) {
    bmiObject.bmi = 'Overweight';
  } else if (bmi < 35) {
    bmiObject.bmi = 'Obese Class I (Moderately obese)';
  } else if (bmi < 40) {
    bmiObject.bmi = 'Obese Class II (Severely obese)';
  } else {
    bmiObject.bmi = 'Obese Class III (Very severely obese)';
  }
  return bmiObject;
};
/*
//console.log(calculateBmi(180, 74))

try {
  const { value1, value2 } = bmiParseArguments(process.argv);
  //calculateBmi(value1, value2);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
*/
export { calculateBmi };