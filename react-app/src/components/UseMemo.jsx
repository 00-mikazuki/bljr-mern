import { useState, useMemo } from "react";

const UseMemo = () => {
  console.log("UseMemo component rendered");
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  // Using useMemo to memoize the result of slowFunction
  const memoizedValue = useMemo(() => {
    return slowFunction(counter1);
  }, [counter1]);

  const handleClick1 = () => {
    setCounter1(counter1 + 1);
  }

  const handleClick2 = () => {
    setCounter2(counter2 + 2);
  }

  return (
    <div>
      <h1>UseMemo Example</h1>
      <p>Counter 1: {counter1}</p>
      <button onClick={handleClick1}>Click counter 1</button>
      <p>Counter 2: {counter2}</p>
      <button onClick={handleClick2}>Click counter 2</button>
      <p>Memoized Value: {memoizedValue}</p>
    </div>
  );

}

const slowFunction = (num) => {
  console.log("Slow function called");
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i; // Simulating a slow operation
  } // Simulating a slow operation
  return result * num;
}

export default UseMemo;