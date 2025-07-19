import { useState, useCallback } from 'react';
import ShowCounter from './ShowCounter';
import Title from './Title';
import Button from './Button';

const UseCallback = () => {
  console.log('UseCallback component rendered');
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const handleIncrementByOne = useCallback(() => {
    setCounter1(counter1 + 1);
  }, [counter1]); // Memoized function to increment counter1

  const handleIncrementByFive = useCallback(() => {
    setCounter2(counter2 + 5);
  }, [counter2]); // Memoized function to increment counter2

  return (
    <div>
      <Title />
      <ShowCounter counter={counter1} title="Counter 1" />
      <Button handleClick={handleIncrementByOne}>Increment by one</Button>
      <hr />
      <ShowCounter counter={counter2} title="Counter 2" />
      <Button handleClick={handleIncrementByFive}>Increment by five</Button>
    </div>
  )
}

export default UseCallback;