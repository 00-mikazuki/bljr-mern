import { memo } from 'react';

const ShowCounter = ({ counter, title }) => {
  console.log(`${title} component rendered`);
  return (
    <div>
      <h3>{title}</h3>
      <p>Counter: {counter}</p>
    </div>
  );
}

export default memo(ShowCounter); // Using memo to prevent unnecessary re-renders