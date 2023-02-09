import { CoursePart } from '../types';

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case 'basic':
      return (
        <div>
          <p>
            <b>
              {course.name} {course.exerciseCount}
            </b>
            <br />
            <i>{course.description}</i>
          </p>
        </div>
      );
    case 'group':
      return (
        <div>
          <p>
            <b>
              {course.name} {course.exerciseCount}
            </b>
            <br />
            Project exercises: {course.groupProjectCount}
          </p>
        </div>
      );
    case 'background':
      return (
        <div>
          <p>
            <b>
              {course.name} {course.exerciseCount}
            </b>
          <br />
            <i>{course.description}</i>
          <br />
          {course.backroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <p>
            <b>
              {course.name} {course.exerciseCount}
            </b>
            <br />
            <i>{course.description}</i>
            <br />
            Required skills: {course.requirements.join(', ')}
          </p>
        </div>
      );

    default: {
      const _exhaustiveCheck: never = course;
      return _exhaustiveCheck;
    }
  }
};

export default Part;
