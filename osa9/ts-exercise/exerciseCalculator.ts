interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateRating = (target: number, average: number):number => {
  const successRate = average / target;
  if(successRate >= 1) return 3;
  if(successRate >= 0.6) return 2;
  return 1;
};

const ratingDescriptions = ['You can do better!','Good job!','Amazing!'
]

const calculateExercises = (dailyExcerciseHours: Array<number>, target: number): Result => {
  const periodLength = dailyExcerciseHours.length;
  const trainingDays = dailyExcerciseHours.filter(day => day !== 0).length;
  const average = dailyExcerciseHours.reduce((sum, current) => sum + current, 0) / periodLength;
  const success = average >= target;
  const rating = calculateRating(target, average);
  const ratingDescription = ratingDescriptions[rating-1];

  return {
  periodLength,
  trainingDays,
  success,
  rating,
  ratingDescription,
  target,
  average,
}
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

