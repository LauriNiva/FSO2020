export const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(height) && isNaN(weight)) throw new Error('Not a number!');

  const bmi = weight / (((height / 100) * height) / 100);

  if (bmi < 18.5) return `Underweight(${bmi.toPrecision(4)})`;
  if (bmi <= 24.9) return `Normal(${bmi.toPrecision(4)})`;
  if (bmi <= 29.9) return `Overweight(${bmi.toPrecision(4)})`;
  return 'Obese';

  // 18.5> underweight
  // 18.5-24.9 normal
  // 25-29.9 overweight
  // 30<= obese
};

const parseArguments = (
  args: Array<string>
): { height: number; weight: number } => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  let errormessage = 'Oh noes!';
  if (error instanceof Error) {
    errormessage += ' Error: ' + error.message;
  }
  console.log(errormessage);
}
