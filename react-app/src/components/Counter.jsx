import { useState } from 'react';

const Counter = ({ render }) => {
  const [count, setCount] = useState(0);

  const HanldeIncrement = () => {
    setCount(count + 1);
  };

  return render(count, HanldeIncrement);
}

export default Counter;