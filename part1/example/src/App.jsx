import { useState } from "react";
const Display = (props) => {
  return <div>{props.counter}</div>;
};
const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  const [value, setValue] = useState(10);
  const handleClick = () => {
    console.log('clicked the button')
    setValue(0)
  }

  return (
    <div>
      {value} 

      <button onClick={handleClick}>button</button>
    </div>
  );
};
export default App;
