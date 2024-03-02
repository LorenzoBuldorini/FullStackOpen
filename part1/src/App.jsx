//part1.1 and part1.2
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
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header name={course} />
      <Content
        part1={part1}
        exercise1={exercises1}
        part2={part2}
        exercise2={exercises2}
        part3={part3}
        exercise3={exercises3}
      />

      <Total totalexs={exercises1 + exercises2 + exercises3} />
    </div>
  );
};
export default App;