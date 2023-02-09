import { CourseParts } from '../types';

interface ContentsProps {
  courseParts: CourseParts;
}
const Contents = ({ courseParts }: ContentsProps) => {
  return (
    <>
      {courseParts.map((course) => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Contents;
