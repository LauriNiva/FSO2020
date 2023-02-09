import { CourseParts } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CourseParts;
}
const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((course) => (
        <Part key={course.name} course={course} />
      ))}
    </>
  );
};

export default Content;
