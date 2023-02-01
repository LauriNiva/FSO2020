const calculateBmi = (height: number, weight: number): string => {

  if(isNaN(height) && isNaN(weight)) throw new Error('Not a number!');

  const bmi = weight / (height/100 * height/100);

  if (bmi < 18.5) return `Underweight(${bmi.toPrecision(4)})`;
  if (bmi <= 24.9) return `Normal(${bmi.toPrecision(4)})`;
  if (bmi <= 29.9) return `Overweight(${bmi.toPrecision(4)})`;
  return 'Obese';

  // 18.5> underweight
  // 18.5-24.9 normal
  // 25-29.9 overweight
  // 30<= obese

}

console.log(calculateBmi(180,74))