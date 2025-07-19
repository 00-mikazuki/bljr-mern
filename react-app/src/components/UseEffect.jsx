import { useState, useEffect } from 'react';

const UseEffectComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  }

  useEffect(() => {
    console.log('Call this effect initially and on every render');
  });

  useEffect(() => {
    console.log('Call this effect only on initial render');
  }, []);

  useEffect(() => {
    console.log('Call this effect only when dependency changes');
  }, [count]); // This effect runs when 'count' changes

  return (
    <div>
      <h2>UseEffect Example</h2>
      <button onClick={handleClick}>Click Counter</button>
      <p>Count: {count}</p>
    </div>
  )
}

export default UseEffectComponent;