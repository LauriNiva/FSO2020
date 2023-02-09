import Contents from './components/Contents';
import Header from './components/Header';
import Total from './components/Total';

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Contents courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
