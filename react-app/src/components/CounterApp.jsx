import { useState } from "react";

const CounterApp = () => {
  const [count, setCount] = useState(0);

  const handleReduce = () => {
    setCount(count - 1);
  }

  const handleIncrease = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <h2>Counter App</h2>
      { count > 0 && <button onClick={handleReduce}>-</button> }
      <button>{count}</button>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
}

export default CounterApp;