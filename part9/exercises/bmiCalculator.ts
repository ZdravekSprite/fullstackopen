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

type BmiResult = String;

const calculateBmi = (height: number, weight: number): BmiResult => {
  const bmi = weight * 10000 / (height * height)
  if (bmi < 15) {
    return 'Very severely underweight';
  } else if (bmi < 16) {
    return 'Severely underweight';
  } else if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight';
  } else if (bmi < 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi < 40) {
    return 'Obese Class II (Severely obese)';
  }
  return 'Obese Class III (Very severely obese)';
}

//console.log(calculateBmi(180, 74))

try {
  const { value1, value2 } = bmiParseArguments(process.argv);
  //calculateBmi(value1, value2);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}