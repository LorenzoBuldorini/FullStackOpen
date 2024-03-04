
import Header from "./header";
const Part = (props) => {
  return (
    <div>
      <p>
        {props.partName},number of exercises {props.exercise}
      </p>
    </div>
  );
};
const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part partName={props.part1} exercise={props.exercise1} />
      <Part partName={props.part2} exercise={props.exercise2} />
      <Part partName={props.part3} exercise={props.exercise3} />
    </div>
  );
};
const Total = (props) => {
  return (
    <div>
      <p>Number of total exercises {props.totalexs}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      
      <Header name={course.name} />
      <Content

        part1={course.parts[0].name}
        exercise1={course.parts[0].exercises}
        part2={course.parts[1].name}
        exercise2={course.parts[1].exercises}
        part3={course.parts[2].name}
        exercise3={course.parts[2].exercises}
      />

      <Total totalexs={course.parts[0].exercises + course.parts[1].exercises+ course.parts[2].exercises} />
    </div>
  );
};
export default App;
