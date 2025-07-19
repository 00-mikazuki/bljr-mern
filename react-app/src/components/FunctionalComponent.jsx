import React from 'react';

const FunctionalComponent = () => {
  const [data, setData] = React.useState("react");

  const handleClick = (course) => {
    console.log("Button clicked");
    setData(course);
  }

  return (
    <div>
      <h2>Functional Component</h2>
      <p>This is a functional component.</p>
      <button type='button' onClick={() => handleClick('vue')}>Click me</button>
      <p>State: {data}</p>
    </div>
  );
}

export default FunctionalComponent;